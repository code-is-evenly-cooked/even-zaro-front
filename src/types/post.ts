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
