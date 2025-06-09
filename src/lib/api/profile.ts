import { PostDetailResponse } from "@/types/post";
import { client } from "../fetch/client";

export const fetchUserPosts = async (
  userId: number,
  page: number,
): Promise<PostDetailResponse> => {
  return await client<PostDetailResponse>(`/profile/${userId}/posts`, {
    needAuth: true,
    params: { page: page },
  });
};

export const fetchUserComments = async (
  userId: number,
  page: number,
): Promise<PostDetailResponse> => {
  return await client<PostDetailResponse>(`/profile/${userId}/comments`, {
    needAuth: true,
    params: { page: page },
  });
};

export const fetchUserLikes = async (
  userId: number,
  page: number,
): Promise<PostDetailResponse> => {
  return await client<PostDetailResponse>(`/profile/${userId}/likes`, {
    needAuth: true,
    params: { page: page },
  });
};

export const updateProfileImage = async (
  key: string,
): Promise<{ profileImage: string }> => {
  return await client<{ profileImage: string }>("/users/me/profileImage", {
    method: "PATCH",
    needAuth: true,
    body: JSON.stringify({ profileImage: `/${key}` }),
  });
};
