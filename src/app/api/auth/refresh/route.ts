import { cookies } from "next/headers";
import { createErrorResponse, createSuccessResponse } from "@/lib/response";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    console.warn("[refreshToken] 쿠키에 refresh_token 없음");
    return createErrorResponse("refresh token 없음", 401);
  }

  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
    });

    const body = await res.json();

    if (!res.ok) {
      return createErrorResponse(body.message ?? "토큰 갱신 실패", res.status);
    }

    return createSuccessResponse(
      { accessToken: body.data.accessToken },
      "accessToken 갱신 성공",
    );
  } catch (err) {
    console.error("[refreshToken] 서버 오류", err);
    return createErrorResponse("서버 오류", 500);
  }
}
