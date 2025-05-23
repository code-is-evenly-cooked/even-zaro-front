export interface CommonPostItem {
  postId: number;
  title: string;
  createAt: string;
}

export interface ImagePostItem extends CommonPostItem {
  content: string;
  thumbnailUrl: string;
  likeCount: number;
  commentCount: number;
  writerProfileImage: string;
  writerNickname: string;
}

// detail
export interface PostDetailItem {
  postId: number;
  title: string;
  content: string;
  thumbnailUrl?: string;
  category: "TOGETHER" | "DAILY_LIFE" | "RANDOM_BUY";
  tag: string;
  likeCount: number;
  commentCount: number;
  imageUrlList: string[];
  createdAt: string;
  user: WriterInfo;
}
export interface WriterInfo {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}
