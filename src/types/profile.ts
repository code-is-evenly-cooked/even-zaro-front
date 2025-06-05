export type ProfileTabType = "posts" | "comments" | "likes" | "favorites";

export const PROFILE_TAB_MAP: Record<ProfileTabType, string> = {
  posts: "내가 쓴",
  comments: "내가 댓글 쓴",
  likes: "내가 좋아요한",
  favorites: "즐겨찾기",
};

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
