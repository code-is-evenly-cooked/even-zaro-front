import React from "react";
import HomeSectionHeader from "./HomeSectionHeader";
import HomeSectionListItem from "./HomeSectionListItem";
import { CommonPostItem, ImagePostItem } from "@/types/post";
import PostImageCard from "../common/SectionCards/PostImageCard";
import clsx from "clsx";
import Link from "next/link";
import { MainCategory } from "@/types/category";

interface HomeSectionProps {
  category: MainCategory;
  items: (CommonPostItem | ImagePostItem)[];
  className?: string;
}

const isImagePostItemArray = (
  arr: (CommonPostItem | ImagePostItem)[],
): arr is ImagePostItem[] => arr.length > 0 && "thumbnailUrl" in arr[0];

const HomeSectionCard = ({ category, items, className }: HomeSectionProps) => {
  const isImage = isImagePostItemArray(items);

  return (
    <div className={clsx("w-full", className)}>
      <HomeSectionHeader category={category} />
      {isImage ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-4">
          {items.map((item) => (
            <Link href={`/board/${category}/${item.postId}`} key={item.postId}>
              <PostImageCard key={item.postId} {...item} />
            </Link>
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col pt-3 gap-3 pl-4 pr-2">
          {items.map((item) => (
            <Link href={`/board/${category}/${item.postId}`} key={item.postId}>
              <HomeSectionListItem key={item.postId} {...item} />
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomeSectionCard;
