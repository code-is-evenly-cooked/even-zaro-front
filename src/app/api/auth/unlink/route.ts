import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { kakaoAccessToken } = await req.json();

  const res = await fetch("https://kapi.kakao.com/v1/user/unlink", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kakaoAccessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!res.ok) {
    const error = await res.text();
    console.error("카카오 unlink 실패:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
