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
    params: { postId, page },
  });
};

interface CreateCommentParams {
  postId: number;
  content: string;
  mentionedNickname: string;
}

export const createComment = async ({
  postId,
  content,
  mentionedNickname = "",
}: CreateCommentParams) => {
  return await client<CommentItem>(`/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({
      content,
      mentionedNickname,
    }),
  });
};

interface EditCommentParams {
  commentId: number;
  content: string;
  mentionedNickname: string;
}

export const editComment = async ({
  commentId,
  content,
  mentionedNickname = "",
}: EditCommentParams) => {
  return await client<CommentItem>(`/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify({
      content,
      mentionedNickname,
    }),
  });
};

export const deleteComment = async (commentId: number) => {
  return await client(`/comments/${commentId}`, {
    method: "DELETE",
  });
};
