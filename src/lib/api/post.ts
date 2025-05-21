import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchPostDetail(postId: string) {
    const token = (await cookies()).get("access_token")?.value;


  const res = await fetch(`${API_BASE_URL}/posts/${postId}`, {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    try {
      const error = await res.json();
      throw new Error(error.message ?? "게시글 조회 실패");
    } catch {
      throw new Error("응답 파싱 실패 (본문 없음)");
    }
  }

  return res.json();
}