import { PostDetailResponse } from "@/types/post";
import { client } from "../fetch/client";

export const fetchUserPosts = async (
  userId: number,
): Promise<PostDetailResponse> => {
  return await client<PostDetailResponse>(`/profile/${userId}/posts`, {
    needAuth: true,
  });
};

export const fetchUserComments = async (
  userId: number,
): Promise<PostDetailResponse> => {
  return await client<PostDetailResponse>(`/profile/${userId}/comments`, {
    needAuth: true,
  });
};

export const fetchUserLikes = async (
  userId: number,
): Promise<PostDetailResponse> => {
  return await client<PostDetailResponse>(`/profile/${userId}/likes`, {
    needAuth: true,
  });
};
