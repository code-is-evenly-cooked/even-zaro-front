import { NextRequest } from "next/server";
import { createSuccessResponse, createErrorResponse } from "@/lib/response";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${API_BASE_URL}/auth/email/password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return createErrorResponse(
        data.message ?? "비밀번호 재설정 메일 발송 실패",
        res.status,
      );
    }

    return createSuccessResponse(
      { message: data.message },
      "비밀번호 재설정 메일 발송 성공",
    );
  } catch (err) {
    return createErrorResponse(`서버 오류: ${err}`, 500);
  }
}
