"use client";

import { useState } from "react";
import { CommentActionType } from "./CommentAction";
import { CommentItem } from "@/types/comment";

interface useCommentListProps {
  onRefresh: () => void;
}

const useCommentList = ({ onRefresh }: useCommentListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleRefresh = () => {
    onRefresh();
  };

  const handleAction = async (action: CommentActionType, item: CommentItem) => {
    switch (action) {
      case "edit":
        setEditingId(item.id);
        break;
      case "delete":
        console.log("댓글 삭제:", item.id);
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

  return {
    editingId,
    handleRefresh,
    handleAction,
    handleCancelEdit,
    handleSubmitEdit,
  };
};

export default useCommentList;
