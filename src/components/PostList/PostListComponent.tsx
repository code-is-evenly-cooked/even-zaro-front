"use client";

import { MainCategory, SubCategoryValue } from "@/types/category";
import Searchbar from "../Searchbar/Searchbar";
import PostListHeader from "./PostListHeader";
import { useState } from "react";
import SubCategoryFilter from "./SubCategoryFilter";

interface PostListComponentProps {
  category: MainCategory;
}

const PostListComponent = ({ category }: PostListComponentProps) => {
  const [selectSubCategory, setSelectedSubCategory] = useState<
    SubCategoryValue | "전체"
  >("전체");

  return (
    <div className="min-h-full flex flex-col pt-10 items-center">
      <Searchbar />
      <div className="flex flex-col w-full pr-2 px-2 gap-7">
        <PostListHeader category={category} />
        <SubCategoryFilter
          mainCategory={category}
          selected={selectSubCategory}
          onSelect={setSelectedSubCategory}
        />
      </div>
    </div>
  );
};

export default PostListComponent;
