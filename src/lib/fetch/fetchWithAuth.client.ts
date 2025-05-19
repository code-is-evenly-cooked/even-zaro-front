import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { APIErrorResponse, APISuccessResponse } from "@/types/api";

let isRefreshing = false;

export const fetchWithAuthClient = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit,
  retry = true,
): Promise<T> => {
  const accessToken = getCookie("access_token");

  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  if (typeof accessToken === "string")
    headers.set("Authorization", `Bearer ${accessToken}`);

  const res = await fetch(input, { ...init, headers });
  const body = await res.json();

  if ((res.status === 401 || res.status === 403) && retry) {
    await refreshToken();
    return await fetchWithAuthClient<T>(input, init, false);
  }

  if (!res.ok) {
    const errorBody = body as APIErrorResponse;
    throw new Error(errorBody.message ?? "요청 실패");
  }

  return (body as APISuccessResponse<T>).data;
};

const refreshToken = async (): Promise<void> => {
  if (isRefreshing) return;
  isRefreshing = true;

  try {
    const res = await fetch("/api/auth/refresh", { method: "POST" });
    const body = await res.json();

    if (!res.ok) throw new Error(body?.message ?? "세션이 만료되었습니다.");

    const { accessToken } = (
      body as APISuccessResponse<{ accessToken: string }>
    ).data;

    setCookie("access_token", accessToken, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  } catch (err) {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    window.location.href = "/login";
    throw err;
  } finally {
    isRefreshing = false;
  }
};
