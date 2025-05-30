import { CommentResponse } from "@/types/comment";
import { client } from "../fetch/client";

interface FetchCommentParams {
  postId: number;
  page: number;
}
export const fetchComment = async ({
  postId,
  page = 0,
}: FetchCommentParams) => {
  return await client<CommentResponse>(`/posts/${postId}/comments`, {
    params: { postId, page, sort: "createdAt,DESC" },
  });
};
