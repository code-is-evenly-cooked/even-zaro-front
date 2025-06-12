import { client } from "@/lib/fetch/client";
import { QueryParams } from "../fetch/util/objectToQueryString";
import { PostDetailResponse } from "@/types/post";

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
