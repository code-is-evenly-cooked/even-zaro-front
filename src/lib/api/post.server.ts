import { server } from "@/lib/fetch/server";
import { PostDetailResponse } from "@/types/post";

// 게시글 단건 조회 (반드시 SSR)
export const fetchPostDetail = async (
  postId: string,
): Promise<PostDetailResponse> => {
  return await server<PostDetailResponse>(`/posts/${postId}`, {
    method: "GET",
    needAuth: true,
  });
};
