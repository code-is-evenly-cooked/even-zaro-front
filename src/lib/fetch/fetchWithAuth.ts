import { cookies } from "next/headers";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { APIErrorResponse, APISuccessResponse } from "@/types/api";

let isRefreshing = false;

export const fetchWithAuth = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit,
  retry = true,
): Promise<T> => {
  const accessToken = getAccessToken();

  const headers = new Headers(init?.headers);
  headers.set("Content-Type", "application/json");
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  const res = await fetch(input, {
    ...init,
    headers,
  });

  const body = await res.json();

  if ((res.status === 401 || res.status === 403) && retry) {
    await refreshToken();
    return await fetchWithAuth<T>(input, init, false);
  }

  if (!res.ok) {
    const errorBody = body as APIErrorResponse;
    throw new Error(errorBody.message ?? "요청에 실패했습니다.");
  }

  const successBody = body as APISuccessResponse<T>;
  return successBody.data;
};

const getAccessToken = async (): Promise<string | null> => {
  if (typeof window === "undefined") {
    // SSR
    const cookieStore = await cookies();
    return cookieStore.get("access_token")?.value ?? null;
  } else {
    // CSR
    const raw = getCookie("access_token");
    return typeof raw === "string" ? raw : null;
  }
};

const refreshToken = async (): Promise<void> => {
  if (isRefreshing) return;
  isRefreshing = true;

  try {
    const res = await fetch("/api/auth/refresh", { method: "POST" });
    const body = await res.json();

    if (!res.ok) {
      const errorBody = body as APIErrorResponse;
      throw new Error(errorBody.message || "세션이 만료되었습니다.");
    }

    const successBody = body as APISuccessResponse<{ accessToken: string }>;
    const newToken = successBody.data.accessToken;

    if (typeof window !== "undefined") {
      // CSR 환경에서만 쿠키 설정
      setCookie("access_token", newToken, {
        path: "/",
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
  } catch (err) {
    if (typeof window !== "undefined") {
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      window.location.href = "/login";
    }
    throw err;
  } finally {
    isRefreshing = false;
  }
};
