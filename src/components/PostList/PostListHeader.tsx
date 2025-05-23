"use client";

import { MainCategory } from "@/types/category";
import { getMainCategoryTitle } from "@/utils/category";
import BaseButton from "../common/Button/BaseButton";
import Link from "next/link";

interface PostListHeaderProps {
  category: MainCategory;
}
const PostListHeader = ({ category }: PostListHeaderProps) => {
  return (
    <div className="flex items-center justify-between pt-10 w-full pr-4 pl-12">
      <h1 className="text-3xl font-bold">{getMainCategoryTitle(category)}</h1>
      <Link href={"/"}>
        <BaseButton size="md" color="skyblue100">
          글쓰기
        </BaseButton>
      </Link>
    </div>
  );
};

export default PostListHeader;
