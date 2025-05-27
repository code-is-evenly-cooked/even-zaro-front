import { client } from "@/lib/fetch/client";

interface FollowingUser {
  userId: number;
  userName: string;
  profileImage: string | null;
}

// 팔로잉 여부 조회
export const fetchFollowings = async (userId: number): Promise<FollowingUser[]> => {
  return await client<FollowingUser[]>(`/profile/${userId}/followings`, {
    method: "GET",
  });
};