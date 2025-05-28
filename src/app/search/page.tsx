import SearchResult from "@/components/Search/SearchResult";
import Searchbar from "@/components/Searchbar/Searchbar";
import { server } from "@/lib/fetch/server";

import { PostDetailResponse } from "@/types/post";
import React from "react";

interface PageProps {
  searchParams: Promise<{
    keyword: string;
    category?: string;
    tag?: string;
    page?: string;
  }>;
}

const SearchPage = async ({ searchParams }: PageProps) => {
  const { keyword, category, tag, page } = await searchParams;

  const posts = await server<PostDetailResponse>(`/search/es`, {
    needAuth: true,
    params: {
      keyword,
      ...(category ? { category } : {}),
      ...(tag ? { tag } : {}),
      page: Number(page) || 0,
    },
  });
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto mt-10">
      <Searchbar />
      <SearchResult keyword={keyword} initialData={posts} />
    </div>
  );
};

export default SearchPage;
