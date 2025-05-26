import { client } from "@/lib/fetch/client";

// 게시글 작성
export async function createPost(payload: {
  title: string;
  content: string;
  category: string;
  tag?: string;
  postImageList?: string[];
  thumbnailImage?: string | null;
}): Promise<number> {
  return await client<number>("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}