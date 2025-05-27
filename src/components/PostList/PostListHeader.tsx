"use client";

import { MainCategory } from "@/types/category";
import { getMainCategoryTitle } from "@/utils/category";
import Link from "next/link";

interface PostListHeaderProps {
  category: MainCategory;
}
const PostListHeader = ({ category }: PostListHeaderProps) => {
  return (
    <div className="flex items-center justify-between pt-10">
      <h1 className="text-3xl font-bold">{getMainCategoryTitle(category)}</h1>
      <Link href={"/editor"}>
        <span className="border border-gray200 hover:bg-gray100 px-3 py-2.5 rounded-md text-gray900 text-md">
          글쓰기
        </span>
      </Link>
    </div>
  );
};

export default PostListHeader;
