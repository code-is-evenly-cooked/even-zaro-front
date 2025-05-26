"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { MainCategory, SubCategoryValue } from "@/types/category";
import { fetchPosts } from "@/lib/api/posts";
import { convertDetailToImagePostItem } from "@/lib/adapters/normalizePost";

import Searchbar from "../Searchbar/Searchbar";
import PostListHeader from "./PostListHeader";
import SubCategoryFilter from "./SubCategoryFilter";
import PostImageCard from "@/components/common/SectionCards/PostImageCard";
import PostListCard from "@/components/common/SectionCards/PostListCard";

interface PostListComponentProps {
  category: MainCategory;
}

const PostListComponent = ({ category }: PostListComponentProps) => {
  const [selectSubCategory, setSelectedSubCategory] =
    useState<SubCategoryValue | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["posts", category, selectSubCategory],
    queryFn: () =>
      fetchPosts({
        category,
        tag: selectSubCategory ?? undefined,
      }),
  });

  return (
    <div className="min-h-full flex flex-col pt-10 items-center">
      <Searchbar mainCategory={category} />

      <div className="flex flex-col w-full pr-2 px-2 gap-7">
        <PostListHeader category={category} />
        <SubCategoryFilter
          mainCategory={category}
          selected={selectSubCategory}
          onSelect={setSelectedSubCategory}
        />

        {isLoading ? (
          // TODO: 스켈레톤
          <p className="text-center text-sm text-gray-500">로딩 중...</p>
        ) : !data || data.content.length === 0 ? (
          <></>
        ) : category === "RANDOM_BUY" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6">
            {data.content.map((post) => (
              <Link
                href={`/board/${category}/${post.postId}`}
                key={post.postId}
              >
                <PostImageCard {...convertDetailToImagePostItem(post)} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {data.content.map((post) => (
              <Link
                href={`/board/${category}/${post.postId}`}
                key={post.postId}
              >
                <PostListCard post={post} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostListComponent;
