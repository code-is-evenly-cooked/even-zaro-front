"use client";

import { useState } from "react";
import { CommentActionType } from "./CommentAction";
import { CommentItem } from "@/types/comment";
import { extractMentionedNickname } from "@/utils/comment";
import useCommentUpdate from "./useCommentUpdate";
import useCommentDelete from "./useCommentDelete";
import { useCommentReplyStore } from "@/stores/useCommentReply";
import { useCommentLoadingStore } from "@/stores/useCommentLoadingStore";
import { useRouter } from "next/navigation";

interface useCommentListProps {
  onRefresh: () => void;
}

const useCommentList = ({ onRefresh }: useCommentListProps) => {
  const router = useRouter();
  const [editingId, setEditingId] = useState<number | null>(null);
  const { mutate: updateCommentMutate } = useCommentUpdate();
  const { mutate: deleteCommentMutate } = useCommentDelete();
  const { setReplyTarget } = useCommentReplyStore();

  const { setEditingId: setLoadingEditingId, setDeletingId } =
    useCommentLoadingStore();

  const handleRefresh = () => {
    onRefresh();
  };

  const handleAction = async (action: CommentActionType, item: CommentItem) => {
    switch (action) {
      case "edit":
        setEditingId(item.id);
        break;
      case "delete":
        setDeletingId(item.id);
        deleteCommentMutate(item.id, {
          onSettled: () => setDeletingId(null),
        });
        break;
      case "report":
        console.log("댓글 신고:", item.id);
        router.push(`/report/${item.id}?type=COMMENT`);
        break;
      case "reply":
        setReplyTarget(item.nickname);
        break;
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSubmitEdit = async (id: number, newContent: string) => {
    const replyNickname = extractMentionedNickname(newContent);
    setLoadingEditingId(id);
    await updateCommentMutate(
      {
        id,
        content: newContent,
        mentionedNickname: replyNickname,
      },
      {
        onSettled: () => {
          setLoadingEditingId(null);
          setEditingId(null);
        },
      },
    );
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
