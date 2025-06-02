"use client";
import { CommentItem } from "@/types/comment";
import CommentListItem from "./CommentListItem";
import IconButton from "@/components/common/Button/IconButton";
import { RefreshCwIcon } from "lucide-react";
import { useState } from "react";
import { CommentActionType } from "./CommentAction";

interface CommentListProps {
  comments: CommentItem[];
  refresh: () => void;
}

const CommentList = ({ comments, refresh }: CommentListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleRefresh = () => {
    refresh();
  };

  const handleAction = async (action: CommentActionType, item: CommentItem) => {
    switch (action) {
      case "edit":
        setEditingId(item.id);
        break;
      case "delete":
        console.log("댓글 삭제:", item.id);
        // TODO: await deleteComment(item.id);
        refresh();
        break;
      case "report":
        console.log("댓글 신고:", item.id);
        break;
      case "reply":
        console.log("댓글 답글:", item.id);
        break;
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSubmitEdit = (id: number, newContent: string) => {
    console.log(`"댓글 수정": ${id} -> ${newContent}`);
  };

  return (
    <div className="flex flex-col mt-4 pt-4 border-t">
      <div className="flex justify-between pr-2">
        <p className="text-md font-bold">댓글 목록</p>
        <IconButton
          icon={<RefreshCwIcon className="w-5 h-5" />}
          label="refresh"
          isTransparent
          onClick={handleRefresh}
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
