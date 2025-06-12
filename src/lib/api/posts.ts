import { client } from "@/lib/fetch/client";
import { QueryParams } from "../fetch/util/objectToQueryString";
import { PostDetailResponse } from "@/types/post";

type CreatePostResponse = {
  category: string;
  postId: number;
};

// 게시글 작성
export async function createPost(payload: {
  title: string;
  content: string;
  category: string;
  tag?: string;
  postImageList?: string[];
  thumbnailImage?: string | null;
}): Promise<CreatePostResponse> {
  return await client<CreatePostResponse>("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export interface FetchPostsParams extends QueryParams {
  category: string;
  tag?: string;
  page?: number;
  size?: number;
}

export const fetchPosts = async ({
  category,
  tag,
  page = 0,
  size = 10,
}: FetchPostsParams): Promise<PostDetailResponse> => {
  return await client<PostDetailResponse>("/posts", {
    needAuth: true,
    params: { category, ...(tag ? { tag } : {}), page, size },
  });
};

export interface FetchSearchPostsParams extends QueryParams {
  keyword: string;
  category?: string;
  tag?: string;
  page?: number;
  size?: number;
}

export const fetchSearchPosts = async ({
  keyword,
  category,
  tag,
  page = 0,
  size = 10,
}: FetchSearchPostsParams): Promise<PostDetailResponse> => {
  return await client<PostDetailResponse>("/search/es", {
    needAuth: true,
    params: {
      keyword,
      ...(category ? { category } : {}),
      ...(tag ? { tag } : {}),
      page,
      size,
    },
  });
};

// 게시글 삭제
export async function deletePost(postId: number): Promise<void> {
  await client(`/posts/${postId}`, {
    method: "DELETE",
    needAuth: true,
  });
}
