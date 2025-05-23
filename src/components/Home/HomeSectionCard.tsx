import React from "react";
import HomeSectionHeader from "./HomeSectionHeader";
import { SectionType } from "./SectionType";
import HomeSectionListItem from "./HomeSectionListItem";
import { CommonPostItem, ImagePostItem } from "@/types/post";
import PostImageCard from "../common/SectionCards/PostImageCard";
import clsx from "clsx";

interface HomeSectionProps {
  type: SectionType;
  items: (CommonPostItem | ImagePostItem)[];
  className?: string;
}

const isImagePostItemArray = (
  arr: (CommonPostItem | ImagePostItem)[],
): arr is ImagePostItem[] => arr.length > 0 && "thumbnailUrl" in arr[0];

const HomeSectionCard = ({ type, items, className }: HomeSectionProps) => {
  const isImage = isImagePostItemArray(items);

  return (
    <div className={clsx("w-full", className)}>
      <HomeSectionHeader type={type} />
      {isImage ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-4">
          {items.map((item) => (
            <PostImageCard key={item.postId} {...item} />
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col pt-3 gap-3 pl-4 pr-2">
          {items.map((item) => (
            <HomeSectionListItem key={item.postId} {...item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomeSectionCard;
