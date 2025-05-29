import { useQuery } from "@tanstack/react-query";

export interface ProfileResponse {
  userId: number;
  nickname: string;
  profileImage: string | null;
  liveAloneDate: string | null;
  mbti: string | null;
  postCount: number;
  followingCount: number;
  followerCount: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchProfile = async (userId: number): Promise<ProfileResponse> => {
  const res = await fetch(`${API_BASE_URL}/profile/${userId}`);
  const body = await res.json();

  if (!res.ok) throw new Error(body.message || "프로필 불러오기 실패");

  return body.data;
};

export const useProfile = (userId: number | null) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => {
      if (userId === null) throw new Error("유저 ID가 없습니다");
      return fetchProfile(userId);
    },
    enabled: userId !== null,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
