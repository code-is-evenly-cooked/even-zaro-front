import { client } from "@/lib/fetch/client";

export interface FollowUser {
  userId: number;
  userName: string;
  profileImage: string | null;
  // TODO: 팔로우 여부 추가
}

// 팔로잉 여부 조회
// TODO: 삭제 예정 사유: 네이밍 통일용
export const fetchFollowings = async (
  userId: number,
): Promise<FollowUser[]> => {
  return await client<FollowUser[]>(`/profile/${userId}/followings`, {
    method: "GET",
  });
};

export const getFollowers = async (userId: string): Promise<FollowUser[]> =>
  await client<FollowUser[]>(`/profile/${userId}/followers`, {
    method: "GET",
  });

export const getFollowings = async (userId: string): Promise<FollowUser[]> =>
  await client<FollowUser[]>(`/profile/${userId}/followings`, {
    method: "GET",
  });

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
