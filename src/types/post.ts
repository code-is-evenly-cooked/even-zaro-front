import { MainCategory, SubCategoryValue } from "./category";

export interface PostHomeResponse {
  together: CommonPostItem[];
  dailyLife: CommonPostItem[];
  randomBuy: CommonPostItem[];
}

export interface CommonPostItem {
  postId: number;
  title: string;
  createdAt: string;
}

export interface ImagePostItem extends CommonPostItem {
  content: string;
  thumbnailImage: string;
  likeCount: number;
  commentCount: number;
  writerProfileImage: string | null;
  writerNickname: string;
}

// detail
export interface PostDetailResponse {
  content: CommonPostDetailItem[];
  totalPages: number;
  number: number;
}

export interface CommonPostDetailItem {
  postId: number;
  title: string;
  content: string;
  contentPreview?: string;
  thumbnailImage?: string;
  category: MainCategory;
  tag: SubCategoryValue;
  likeCount: number;
  commentCount: number;
  postImageList: string[];
  createdAt: string;
}

export interface ImagePostDetailItem extends CommonPostDetailItem {
  writerNickname: string;
  writerProfileImage: string;
}

export interface UserCommentedResponse {
  content: UserCommentedItem[];
  totalPages: number;
  number: number;
}

export interface UserCommentedItem {
  postId: number;
  title: string;
  category: MainCategory;
  tag: SubCategoryValue;
  likeCount: number;
  commentCount: number;
  commentContent: string;
  commentCreatedAt: string;
}
