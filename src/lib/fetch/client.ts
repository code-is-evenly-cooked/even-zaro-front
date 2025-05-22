import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { APIErrorResponse, APISuccessResponse } from "@/types/api";

let isRefreshing = false;

export const client = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit,
  retry = true,
): Promise<T> => {
  try {
    const accessToken = getCookie("access_token");

    const headers = new Headers(init?.headers);
    headers.set("Content-Type", "application/json");
    if (typeof accessToken === "string") {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    const res = await fetch(input, {
      ...init,
      headers,
      credentials: "include",
    });

    const body = await res.json();

    if ((res.status === 401 || res.status === 403) && retry) {
      const refreshed = await refreshToken();
      if (refreshed) {
        return await client<T>(input, init, false);
      } else {
        window.location.href = "/login";
        throw new APIErrorResponse({
          code: "AUTH_EXPIRED",
          message: "로그인이 필요합니다.",
          statusCode: 401,
        });
      }
    }

    if (!res.ok) {
      if (
        typeof body !== "object" ||
        body === null ||
        typeof body.message !== "string" ||
        typeof body.status !== "number"
      ) {
        throw new APIErrorResponse({
          code: "INVALID_RESPONSE",
          message: "서버에서 비정상적인 응답을 반환했습니다.",
          statusCode: res.status,
        });
      }

      throw new APIErrorResponse({
        code: body.code ?? "SERVER_ERROR",
        message: body.message,
        statusCode: body.status,
      });
    }

    return (body as APISuccessResponse<T>).data;
  } catch (err) {
    console.error("🔥 client fetch error ->", err);
    throw err;
  }
};

const refreshToken = async (): Promise<boolean> => {
  if (isRefreshing) return false;
  isRefreshing = true;

  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    const body = await res.json();

    // accessToken이 null이면 로그인 유지 실패
    if (!res.ok || !body?.data?.accessToken) {
      throw new APIErrorResponse({
        code: "AUTH_EXPIRED",
        message: "토큰 갱신 실패 또는 refresh_token 없음",
        statusCode: 401,
      });
    }

    const accessToken = body.data.accessToken;

    setCookie("access_token", accessToken, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return true;
  } catch (err) {
    console.log("refreshToken fetch error ->", err);
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    return false;
  } finally {
    isRefreshing = false;
  }
};
