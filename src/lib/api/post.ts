import { server } from "@/lib/fetch/server";

export interface PostDetailResponse {
  postId: number;
  title: string;
  content: string;
  thumbnailUrl: string;
  category: string;
  tag: string;
  likeCount: number;
  commentCount: number;
  imageUrlList: string[];
  createdAt: string;
  user: {
    userId: number;
    nickname: string;
    profileImage: string;
  };
}

export const fetchPostDetail = async (postId: string): Promise<PostDetailResponse> => {
  return await server<PostDetailResponse>(`/posts/${postId}`, {
    method: "GET",
    needAuth: true,
  });
};