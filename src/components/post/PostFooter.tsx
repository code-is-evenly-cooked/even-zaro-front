"use client";

import { MessageCircle, Heart } from "lucide-react";
import { ShareIcon } from "../common/Icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useKakaoInit } from "@/hooks/useKakaoInit";
import ShareModal from "./ShareModal";

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
  postId,
  likeCount,
  commentCount,
  liked,
  isReady,
  onToggleLike,
  authorUserId,
  currentUserId,
}: PostFooterProps) {
  const [openShareModal, setOpenShareModal] = useState(false);
  const router = useRouter();
  

  // 글 작성자와 로그인 유저가 같은 지 확인
  const isMine = currentUserId === authorUserId;

  // 카카오 공유 sdk
  useKakaoInit();

  // 신고 하기
  const handleReport = () => {
    router.push(`/report/${postId}?type=POST`);
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
        <button onClick={() => setOpenShareModal(true)} className="flex items-center gap-2">
          <ShareIcon />
          <span>공유하기</span>
        </button>
      </div>
      {!isMine && currentUserId && (
        <div>
          <button
            onClick={handleReport}
            className="flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <span>신고</span>
          </button>
        </div>
      )}
      {openShareModal && <ShareModal onClose={() => setOpenShareModal(false)} />}
    </div>
  );
}
