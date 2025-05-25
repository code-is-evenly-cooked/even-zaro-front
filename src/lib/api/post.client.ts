import { client } from "@/lib/fetch/client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 게시글 좋아요
export async function likePost(postId: number) {
  return client(`${API_BASE_URL}/posts/${postId}/like`, {
    method: "POST",
  });
}

// 게시글 좋아요 취소
export async function unlikePost(postId: number) {
  return client(`${API_BASE_URL}/posts/${postId}/like`, {
    method: "DELETE",
  });
}
