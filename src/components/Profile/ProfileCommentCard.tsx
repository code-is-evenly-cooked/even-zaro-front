"use client";

import { UserCommentedItem } from "@/types/post";
import { getSubCategoryEmoji, getSubCategoryLabel } from "@/utils/category";
import { getSimplifiedDate } from "@/utils/date";
import { removeMarkdownImages } from "@/utils/image";
import { ChevronRightIcon, HeartIcon, MessageCircle } from "lucide-react";

interface ProfileCommentCardProps {
  item: UserCommentedItem;
}

const ProfileCommentCard = ({ item }: ProfileCommentCardProps) => {
  return (
    <div className="flex flex-col w-full pt-3 pb-3 gap-2 border-b">
      <div className="flex flex-col">
        <p className="text-gray900 line-clamp-2">
          {removeMarkdownImages(item.commentContent)}
        </p>
        <p className="text-gray600 text-sm">
          {getSimplifiedDate(item.commentCreatedAt)}
        </p>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div>
          <p className="flex items-center text-gray600 line-clamp-1">
            {getSubCategoryLabel(item.tag)}
            <ChevronRightIcon width={16} height={16} />
            {getSubCategoryEmoji(item.tag)} {item.title}
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray600">
          <div className="flex items-center gap-1">
            <HeartIcon width={12} height={12} />
            {item.likeCount}
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle width={12} height={12} />
            {item.commentCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCommentCard;
