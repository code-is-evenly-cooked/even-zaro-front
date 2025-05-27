import { client } from "@/lib/fetch/client";

type CreatePostResponse = {
  category: string;
  postId: number;
};

// 게시글 작성
export async function createPost(payload: {
  title: string;
  content: string;
  category: string;
  tag?: string;
  postImageList?: string[];
  thumbnailImage?: string | null;
}): Promise<CreatePostResponse> {
  return await client<CreatePostResponse>("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}