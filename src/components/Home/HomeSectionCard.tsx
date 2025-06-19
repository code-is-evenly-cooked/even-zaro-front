import React from "react";
import HomeSectionHeader from "./HomeSectionHeader";
import HomeSectionListItem from "./HomeSectionListItem";
import { CommonPostItem, ImagePostItem } from "@/types/post";
import clsx from "clsx";
import Link from "next/link";
import { MainCategory } from "@/types/category";
import FallbackMessage from "../common/Fallback/FallbackMessage";
import HomeSectionImageItem from "./HomeSectionImageItem";

interface HomeSectionProps {
  category: MainCategory;
  items: (CommonPostItem | ImagePostItem)[];
  className?: string;
}

const isImagePostItemArray = (
  arr: (CommonPostItem | ImagePostItem)[],
): arr is ImagePostItem[] => arr.length > 0 && "thumbnailImage" in arr[0];

const HomeSectionCard = ({ category, items, className }: HomeSectionProps) => {
  const isImage = isImagePostItemArray(items);

  if (items.length === 0) {
    return (
      <div className={clsx("w-full", className)}>
        <HomeSectionHeader category={category} />
        <FallbackMessage message="아직 게시글이 없습니다." />
      </div>
    );
  }

  return (
    <div className={clsx("w-full", className)}>
      <HomeSectionHeader category={category} />
      {isImage ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6 pt-4">
          {items.slice(0, 4).map((item) => (
            <li key={item.postId}>
              <Link
                href={`/board/${category}/${item.postId}`}
                key={item.postId}
              >
                <HomeSectionImageItem {...item} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.postId}>
              <Link
                href={`/board/${category}/${item.postId}`}
                key={item.postId}
              >
                <HomeSectionListItem key={item.postId} {...item} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomeSectionCard;
