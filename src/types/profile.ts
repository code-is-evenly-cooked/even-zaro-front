export type ProfileTabType = "posts" | "comments" | "likes" | "bookmarks";

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
