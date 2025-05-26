const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// access_token 가져오기
function getAccessToken(): string | null {
  const match = document.cookie.match(/access_token=([^;]+)/);
  return match ? match[1] : null;
}

export async function createPost(payload: {
  title: string;
  content: string;
  category: string;
  tag?: string;
  imageUrlList?: string[];
  thumbnailImage?: string | null;
}): Promise<number> {
  const token = getAccessToken();
  if (!token) {
    throw new Error("로그인 상태를 확인할 수 없습니다.");
  }

  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message ?? "게시글 작성 실패");
  }

  const json = await res.json();
  return json.data.postId;
}
