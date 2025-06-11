"use client";

import { useRouter } from "next/navigation";
import { CATEGORY_MAP } from "@/constants/category";

interface PostHeaderProps {
  category: keyof typeof CATEGORY_MAP;
  tag: string;
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

  // 카테고리(mainCategory)와 태그(subCategory)
  const mainCategory = CATEGORY_MAP[category];
  const subCategory = mainCategory.options.find((opt) => opt.tag === tag);

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
          {mainCategory.label}
        </button>
        {" > "}
        <button
          onClick={handleClickSubCategory}
          className="text-secondary hover:underline cursor-pointer"
        >
          {subCategory
            ? `${subCategory.emoji} ${subCategory.label}`
            : "알 수 없음"}
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray900">{title}</h1>

      <p className="text-sm text-gray-400">{formatDate(createdAt)}</p>
    </header>
  );
}
