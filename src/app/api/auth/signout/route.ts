import { removeAuthCookies } from "@/lib/auth/cookie";
import { createErrorResponse, createSuccessResponse } from "@/lib/response";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return createErrorResponse("access token 없음", 401);
    }
    const res = await fetch(`${API_BASE_URL}/auth/signout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      return createErrorResponse(data.message ?? "로그아웃  실패", res.status);
    }

    await removeAuthCookies();

    return createSuccessResponse(null, "로그아웃 성공");
  } catch (err) {
    return createErrorResponse(`서버 오류: ${err}`, 500);
  }
}
