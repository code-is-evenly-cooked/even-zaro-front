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
  authorUserId: number;
  currentUserId?: number;
}

export default function PostFooter({
  likeCount,
  commentCount,
  liked,
  isReady,
  onToggleLike,
  authorUserId,
  currentUserId,
}: PostFooterProps) {
  const { showToastMessage } = useToastMessageContext();

  // 글 작성자와 로그인 유저가 같은 지 확인
  const isMine = currentUserId === authorUserId;

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
        message: "URL 복사에 실패하였습니다.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-between text-gray600">
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
      {!isMine && currentUserId && (
        <div>
          <button
            // TODO: 신고 기능 추가하기 (onClick={handleReport})
            className="flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <span>신고</span>
          </button>
        </div>
      )}
    </div>
  );
}
