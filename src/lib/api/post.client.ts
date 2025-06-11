import { client } from "@/lib/fetch/client";
import type { CreatePostPayload, CreatePostResponse, UpdatePostPayload } from "@/types/editor";

// 게시글 작성
export const createPost = async (
  payload: CreatePostPayload,
): Promise<CreatePostResponse> => {
  return await client<CreatePostResponse>("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    needAuth: true,
  });
};

// 게시글 수정
export const updatePost = async (
  postId: number,
  payload: UpdatePostPayload
): Promise<void> => {
  return await client(`/posts/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    needAuth: true,
  });
};

// 게시글 삭제
export async function deletePost(postId: number): Promise<void> {
  await client(`/posts/${postId}`, {
    method: "DELETE",
    needAuth: true,
  });
}

// 게시글 좋아요 여부 조회
export const getPostLikeStatus = async (postId: number): Promise<boolean> => {
  return await client<boolean>(`/posts/${postId}/like`, {
    method: "GET",
  });
};

// 게시글 좋아요
export async function likePost(postId: number) {
  return client(`/posts/${postId}/like`, {
    method: "POST",
  });
}

// 게시글 좋아요 취소
export async function unlikePost(postId: number) {
  return client(`/posts/${postId}/like`, {
    method: "DELETE",
  });
}
