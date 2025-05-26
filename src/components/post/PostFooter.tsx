"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Heart } from "lucide-react";
import { likePost, unlikePost, getPostLikeStatus } from "@/lib/api/post.client";

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

  // 좋아요 여부 조회
  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const liked = await getPostLikeStatus(postId);
        setLiked(liked);
      } catch (error) {
        console.error("좋아요 여부 조회 실패:", error);
      }
    };

    fetchLikeStatus();
  }, [postId]);

  // 좋아요 토글
  const handleToggleLike = async () => {
    const prevLiked = liked;
    const prevCount = likeCount;

    try {
      // UI 우선 반영
      setLiked(!prevLiked);
      setLikeCount(prevCount + (prevLiked ? -1 : 1));

      // 실제 API 호출
      if (prevLiked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
    } catch (error) {
      // 실패 시 UI 롤백
      setLiked(prevLiked);
      setLikeCount(prevCount);
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
