const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createPost(
    token: string,
    payload: {
      title: string;
      content: string;
      category: string;
      tag?: string;
      imageUrlList?: string[];
      thumbnailUrl?: string | null;
    }
  ): Promise<number> {
    const res = await fetch(`${API_BASE_URL}/api/posts`, {
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