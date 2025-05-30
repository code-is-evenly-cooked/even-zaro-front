"use client";

import { MessageCircle, Heart } from "lucide-react";
import { ShareIcon } from "../common/Icons";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";

interface PostFooterProps {
  postId: number;
  likeCount: number;
  commentCount: number;
  liked: boolean;
  isReady: boolean;
  onToggleLike: () => void;
}

export default function PostFooter({
  likeCount,
  commentCount,
  liked,
  isReady,
  onToggleLike,
}: PostFooterProps) {
  const { showToastMessage } = useToastMessageContext();

  // 공유하기
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToastMessage({
        message: "URL이 복사되었습니다.",
        type: "success",
      });
    } catch {
      showToastMessage({
        message: "URL이 복사되었습니다.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex items-center gap-6 text-gray600">
      <button
        onClick={onToggleLike}
        disabled={!isReady}
        className="flex items-center gap-2"
      >
        <Heart fill={liked ? "red" : "none"} size={20} />
        <span>{likeCount}</span>
      </button>
      <div className="flex items-center gap-2">
        <MessageCircle size={20} />
        <span>{commentCount}</span>
      </div>
      <button onClick={handleShare} className="flex items-center gap-2">
        <ShareIcon />
        <span>공유하기</span>
      </button>
    </div>
  );
}
