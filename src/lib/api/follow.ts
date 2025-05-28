import { client } from "@/lib/fetch/client";

interface FollowingUser {
  userId: number;
  userName: string;
  profileImage: string | null;
}

// 팔로잉 여부 조회
export const fetchFollowings = async (
  userId: number,
): Promise<FollowingUser[]> => {
  return await client<FollowingUser[]>(`/profile/${userId}/followings`, {
    method: "GET",
  });
};

// 팔로우
export const followUser = async (userId: number) => {
  await client(`/profile/${userId}/follow`, {
    method: "POST",
  });
};

// 팔로우 취소
export const unfollowUser = async (userId: number) => {
  await client(`/profile/${userId}/follow`, {
    method: "DELETE",
  });
};
