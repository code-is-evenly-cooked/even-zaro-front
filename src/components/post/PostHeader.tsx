"use client";

import { useRouter } from "next/navigation";
import type { MainCategory, SubCategoryValue } from "@/types/category";
import {
  getMainCategoryLabel,
  getSubCategoryLabel,
  getSubCategoryEmoji,
} from "@/utils/category";

interface PostHeaderProps {
  category: MainCategory;
  tag: SubCategoryValue;
  title: string;
  createdAt: string;
}

export default function PostHeader({
  category,
  tag,
  title,
  createdAt,
}: PostHeaderProps) {
  const router = useRouter();

  // 시간 형식 변환
  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);

    const datePart = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${datePart} ${timePart}`;
  }

  // 카테고리와 태그 클릭 시 게시판 이동
  const handleClickMainCategory = () => {
    router.push(`/board/${category}`);
  };

  const handleClickSubCategory = () => {
    router.push(`/board/${category}?tag=${tag}`);
  };

  return (
    <header className="space-y-2">
      <div className="text-sm text-gray600 font-medium">
        <button
          onClick={handleClickMainCategory}
          className="text-primary hover:underline cursor-pointer"
        >
          {getMainCategoryLabel(category)}
        </button>
        {" > "}
        <button
          onClick={handleClickSubCategory}
          className="text-secondary hover:underline cursor-pointer"
        >
          {`${getSubCategoryEmoji(tag)} ${getSubCategoryLabel(tag)}`}
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray900">{title}</h1>

      <p className="text-sm text-gray-400">{formatDate(createdAt)}</p>
    </header>
  );
}
