"use client";

import { useEffect, useState } from "react";
import { MainCategory, SubCategoryValue } from "@/types/category";

import Searchbar from "../Searchbar/Searchbar";
import PostListHeader from "./PostListHeader";
import SubCategoryFilter from "./SubCategoryFilter";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PostListHeaderSectionProps {
  category: MainCategory;
}

const PostListHeaderSection = ({ category }: PostListHeaderSectionProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL 쿼리에서 초기 tag 값 읽기
  const initialTag = searchParams.get("tag") as SubCategoryValue | null;
  const [selectSubCategory, setSelectedSubCategory] =
    useState<SubCategoryValue | null>(initialTag);

  const handleSelectSubCategory = (tag: SubCategoryValue | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (tag) {
      newParams.set("tag", tag);
    } else {
      newParams.delete("tag");
    }
    router.push(`${pathname}?${newParams.toString()}`);
    setSelectedSubCategory(tag);
  };

  useEffect(() => {
    const tag = searchParams.get("tag") as SubCategoryValue | null;
    setSelectedSubCategory(tag);
  }, [searchParams]);

  return (
    <div className="min-h-full flex flex-col pt-10 items-center">
      <Searchbar mainCategory={category} onlyTag={true} />

      <div className="flex flex-col w-full pr-2 px-2 gap-7">
        <PostListHeader category={category} />
        <SubCategoryFilter
          mainCategory={category}
          selected={selectSubCategory}
          onSelect={handleSelectSubCategory}
        />
      </div>
    </div>
  );
};

export default PostListHeaderSection;
