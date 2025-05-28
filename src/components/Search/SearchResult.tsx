"use client";
import { fetchSearchPosts } from "@/lib/api/posts";
import { MainCategory, SubCategoryValue } from "@/types/category";
import { PostDetailResponse } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";
import FallbackMessage from "../common/Fallback/FallbackMessage";

import Link from "next/link";
import SearchListItem from "./SearchListItem";

interface SearchResultProps {
  keyword: string;
  initialData: PostDetailResponse;
}
const SearchResult = ({ keyword, initialData }: SearchResultProps) => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") as MainCategory | null;
  const tag = searchParams.get("tag") as SubCategoryValue | null;
  const page = Number(searchParams.get("page") || 0);

  const { data } = useQuery<PostDetailResponse>({
    queryKey: ["searchPosts", keyword, category, tag, page],
    queryFn: () =>
      fetchSearchPosts({
        keyword,
        category: category ?? undefined,
        tag: tag ?? undefined,
        page,
      }),
    initialData: initialData,
    staleTime: 1000 * 60,
  });

  const posts = data.content ?? [];
  const isEmpty = posts.length === 0;

  // 외부로 빼기
  if (isEmpty) {
    return (
      <FallbackMessage message="검색 결과가 없습니다." className="mt-10" />
    );
  }

  return (
    <div className="flex flex-col pt-4 mx-4">
      {posts.map((post) => (
        <Link href={`/board/${category}/${post.postId}`} key={post.postId}>
          <SearchListItem post={post} />
        </Link>
      ))}
    </div>
  );
};

export default SearchResult;
