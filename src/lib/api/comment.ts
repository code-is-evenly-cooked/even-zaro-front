import { CommentItem, CommentResponse } from "@/types/comment";
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

interface EditCommentParams {
  postId: number;
  content: string;
  mentionedNickname: string;
}
export const editComment = async ({
  postId,
  content,
  mentionedNickname = "",
}: EditCommentParams) => {
  return await client<CommentItem>(`/comments/${postId}`, {
    method: "PATCH",
    body: JSON.stringify({
      content,
      mentionedNickname,
    }),
  });
};
