"use client";

import { useState } from "react";
import { CommentActionType } from "./CommentAction";
import { CommentItem } from "@/types/comment";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { extractMentionedNickname } from "@/utils/comment";
import useCommentUpdate from "./useCommentUpdate";

interface useCommentListProps {
  onRefresh: () => void;
}

const useCommentList = ({ onRefresh }: useCommentListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const { showToastMessage } = useToastMessageContext();
  const { mutateAsync: updateCommentMutate } = useCommentUpdate();

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

  const handleSubmitEdit = async (id: number, newContent: string) => {
    const replyNickname = extractMentionedNickname(newContent);
    try {
      await updateCommentMutate({
        id,
        content: newContent,
        mentionedNickname: replyNickname,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "오류가 발생했습니다.";
      showToastMessage({ type: "error", message: errorMessage });
    } finally {
      setEditingId(null);
    }
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
