"use client";

import { useState } from "react";
import { CommentActionType } from "./CommentAction";
import { CommentItem } from "@/types/comment";
import { extractMentionedNickname } from "@/utils/comment";
import useCommentUpdate from "./useCommentUpdate";
import useCommentDelete from "./useCommentDelete";

interface useCommentListProps {
  onRefresh: () => void;
}

const useCommentList = ({ onRefresh }: useCommentListProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const { mutate: updateCommentMutate } = useCommentUpdate();
  const { mutate: deleteCommentMutate } = useCommentDelete();

  const handleRefresh = () => {
    onRefresh();
  };

  const handleAction = async (action: CommentActionType, item: CommentItem) => {
    switch (action) {
      case "edit":
        setEditingId(item.id);
        break;
      case "delete":
        deleteCommentMutate(item.id);
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

    await updateCommentMutate({
      id,
      content: newContent,
      mentionedNickname: replyNickname,
    });

    setEditingId(null);
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
