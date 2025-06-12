import { server } from "@/lib/fetch/server";
import { CommonPostDetailItem } from "@/types/post";

// 게시글 단건 조회 (반드시 SSR)
export const fetchPostDetail = async (
  postId: string,
): Promise<CommonPostDetailItem> => {
  return await server<CommonPostDetailItem>(`/posts/${postId}`, {
    method: "GET",
    needAuth: true,
  });
};
