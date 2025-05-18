import { NextRequest } from "next/server";
import { createErrorResponse, createSuccessResponse } from "@/lib/response";
import { saveAuthCookies } from "@/lib/auth/cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
  try {
    const credentials = await req.json();

    const res = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    if (!res.ok) {
      return createErrorResponse(data.message ?? "로그인 실패", res.status);
    }

    const { accessToken, refreshToken } = data.data;

    await saveAuthCookies({ accessToken, refreshToken });

    return createSuccessResponse(null, "로그인 성공");
  } catch (err) {
    return createErrorResponse(`서버 오류: ${err}`, 500);
  }
}
