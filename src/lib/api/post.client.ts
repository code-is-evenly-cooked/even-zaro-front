import { client } from "@/lib/fetch/client";

type LikeStatusResponse = {
  code: string;
  message: string;
  data: boolean;
};

// 게시글 좋아요 여부 조회
export const getPostLikeStatus = async (postId: number): Promise<boolean> => {
  const res = await client<LikeStatusResponse>(
    `/posts/${postId}/like`,
    {
      method: "GET",
    },
  );
  return res.data;
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
