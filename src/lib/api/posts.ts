import { client } from "@/lib/fetch/client";
import { QueryParams } from "../fetch/util/objectToQueryString";
import { PostDetailItem } from "@/types/post";

// 게시글 작성
export async function createPost(payload: {
  title: string;
  content: string;
  category: string;
  tag?: string;
  postImageList?: string[];
  thumbnailImage?: string | null;
}): Promise<number> {
  return await client<number>("/posts", {
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

export const fetchPosts = async (params: FetchPostsParams) => {
  return await client<{ content: PostDetailItem[] }>("/posts", {
    needAuth: true,
    params,
  });
};
