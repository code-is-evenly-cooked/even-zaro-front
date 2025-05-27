import { client } from "@/lib/fetch/client";

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
