"use client";
import { CommentItem } from "@/types/comment";
import CommentListItem from "./CommentListItem";
import IconButton from "@/components/common/Button/IconButton";
import { RefreshCwIcon } from "lucide-react";
import useCommentList from "./useCommentList";

interface CommentListProps {
  comments: CommentItem[];
  refresh: () => void;
  onCommentCountChange?: (updater: (prev: number) => number) => void;
}

const CommentList = ({
  comments,
  refresh,
  onCommentCountChange,
}: CommentListProps) => {
  const { editingId, handleAction, handleCancelEdit, handleSubmitEdit } =
    useCommentList({ onCommentCountChange });

  return (
    <div className="flex flex-col mt-4 pt-4 border-t">
      <div className="flex justify-between pr-2">
        <p className="text-md font-bold">댓글 목록</p>
        <IconButton
          icon={<RefreshCwIcon className="w-5 h-5" />}
          label="refresh"
          isTransparent
          onClick={refresh}
        />
      </div>
      <ul className="flex flex-col mx-2 py-2">
        {comments.map((comment, index) => (
          <li key={comment.id}>
            <CommentListItem
              item={comment}
              isLast={index === comments.length - 1}
              isEditing={editingId === comment.id}
              onCancelEdit={handleCancelEdit}
              onSubmitEdit={(newContent) =>
                handleSubmitEdit(comment.id, newContent)
              }
              onAction={handleAction}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
