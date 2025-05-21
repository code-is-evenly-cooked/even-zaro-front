import { cookies } from "next/headers";
import { createSuccessResponse, createErrorResponse } from "@/lib/response";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    console.warn("[accessToken] 쿠키에 access_token 없음");
    return createSuccessResponse(
      { accessToken: null },
      "access_token 없음 - 로그인 유지 불가",
    );
  }

  try {
    const res = await fetch(`${API_BASE_URL}/users/my`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return createErrorResponse("유저 정보 조회 실패", res.status);
    }

    const body = await res.json();

    return createSuccessResponse(body.data, "유저 정보 조회 성공");
  } catch (err) {
    console.log(err);
    return createErrorResponse("서버 오류", 500);
  }
}
