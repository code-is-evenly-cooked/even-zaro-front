"use client";

import { MessageCircle, Heart } from "lucide-react";

interface PostFooterProps {
  postId: number;
  likeCount: number;
  commentCount: number;
  liked: boolean | null;
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
    </div>
  );
}
