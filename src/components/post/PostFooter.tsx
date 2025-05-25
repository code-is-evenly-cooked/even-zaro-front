"use client";

import { useState } from "react";
import { MessageCircle, Heart } from "lucide-react";
import { likePost, unlikePost } from "@/lib/api/post.client";

interface PostFooterProps {
  postId: number;
  likeCount: number;
  commentCount: number;
}

export default function PostFooter({
  postId,
  likeCount: initialLikeCount,
  commentCount,
}: PostFooterProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(false);

  // 좋아요 토글
  const handleToggleLike = async () => {
    try {
      if (liked) {
        await unlikePost(postId);
        setLikeCount((prev) => prev - 1);
      } else {
        await likePost(postId);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("좋아요 토글 실패:", error);
    }
  };

  return (
    <div className="flex items-center gap-6 mt-8 text-gray-600">
      <button onClick={handleToggleLike} className="flex items-center gap-2">
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
