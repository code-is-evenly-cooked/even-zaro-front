"use client";

import { CommentItem } from "@/types/comment";
import { getProfileImageUrl } from "@/utils/image";

import Image from "next/image";
import CommentAction, { CommentActionType } from "../CommentAction";
import { renderWithMentions } from "@/utils/comment";
import CommentEditForm from "./CommentEditForm";

interface CommentItemProps {
  item: CommentItem;
  isLast: boolean;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSubmitEdit: (content: string) => void;
}

const CommentListItem = ({
  item,
  isLast,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSubmitEdit,
}: CommentItemProps) => {
  const handleAction = (action: CommentActionType) => {
    // "edit" | "delete" | "reply" | "report"
    switch (action) {
      case "edit":
        onStartEdit();
      case "delete":
      // TODO: delete
      case "reply":
      // TODO: reply
      case "report":
      // TODO: report
    }
  };

  return (
    <div className={`flex flex-col gap-2 py-3 ${isLast ? "" : "border-b"}`}>
      {isEditing ? (
        <CommentEditForm
          item={item}
          onCancel={onCancelEdit}
          onSubmit={onSubmitEdit}
        />
      ) : (
        <div>
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
          <p className="text-md text-gray900 px-2">
            {renderWithMentions(item.content)}
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentListItem;
