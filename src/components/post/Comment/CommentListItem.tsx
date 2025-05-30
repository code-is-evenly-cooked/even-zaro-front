"use client";

import { CommentItem } from "@/types/comment";
import { getProfileImageUrl } from "@/utils/image";

import Image from "next/image";
import CommentAction from "./CommentAction";

interface CommentItemProps {
  item: CommentItem;
  isLast: boolean;
}

const CommentListItem = ({ item, isLast }: CommentItemProps) => {
  const handleAction = (action: string) => {
    console.log(action);
  };

  return (
    <div className={`flex flex-col gap-2 py-3 ${isLast ? "" : "border-b"}`}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={getProfileImageUrl(item.profileImage)}
            alt={item.nickname}
            width={32}
            height={32}
            className="w-7 h-7 rounded-full"
          />
          <p className="text-md text-gray900">{item.nickname}</p>
          {/* TODO: livealonedate */}
        </div>
        <CommentAction isMine={item.isMine} onAction={handleAction} />
      </div>
      <p className="text-md text-gray900 px-2">{item.content}</p>
    </div>
  );
};

export default CommentListItem;
