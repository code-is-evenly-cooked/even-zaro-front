export type ProfileTabType = "posts" | "comments" | "likes" | "favorites";

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
