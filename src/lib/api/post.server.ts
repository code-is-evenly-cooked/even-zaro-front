import { server } from "@/lib/fetch/server";
import { SinglePostDetailResponse } from "@/types/post";

// 게시글 단건 조회 (반드시 SSR)
export const fetchPostDetail = async (
  postId: string,
): Promise<SinglePostDetailResponse> => {
  return await server<SinglePostDetailResponse>(`/posts/${postId}`, {
    method: "GET",
    needAuth: true,
  });
};
