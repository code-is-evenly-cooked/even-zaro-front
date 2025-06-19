"use client";

import { useEffect, useRef, useState } from "react";
import PostFooter from "./PostFooter";
import { getPostLikeStatus, likePost, unlikePost } from "@/lib/api/post.client";
import { useAuthStore } from "@/stores/useAuthStore";

interface Props {
  postId: number;
  likeCount: number;
  commentCount: number;
  authorUserId: number;
  postTitle: string;
  postThumbnailUrl?: string;
}

export default function PostFooterWithFloating({
  postId,
  likeCount: initialLikeCount,
  commentCount,
  authorUserId,
  postTitle,
  postThumbnailUrl,
}: Props) {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const currentUserId = useAuthStore((state) => state.user?.userId);

  const [showFloatingFooter, setShowFloatingFooter] = useState(true);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(false);
  const isReady = liked !== null;

  // 좋아요 여부 조회
  useEffect(() => {
    const fetch = async () => {
      const status = await getPostLikeStatus(postId);
      setLiked(status);
    };
    fetch();
  }, [postId]);

  // 플로팅 여부 감지
  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingFooter(!entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  // 좋아요 토글 (낙관적 업데이트 방식 + 롤백 추가)
  const handleToggleLike = async () => {
    if (!isReady) return; // 상태 준비 전에는 버튼 사용 불가

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

  // PostFooter 상태 공유
  const sharedProps = {
    postId,
    likeCount,
    commentCount,
    liked,
    isReady,
    onToggleLike: handleToggleLike,
    authorUserId,
    currentUserId,
    postTitle,
    postThumbnailUrl,
  };

  return (
    <>
      {/* 본문 하단 고정 푸터 (관측 대상) */}
      <div ref={footerRef}>
        <PostFooter {...sharedProps} />
      </div>

      {/* 플로팅 푸터 */}
      {showFloatingFooter && (
        <div className="fixed bottom-0 left-0 w-full px-4 z-50 border-t bg-white shadow-md">
          <div className="max-w-3xl mx-auto px-2 py-3">
            <PostFooter {...sharedProps} />
          </div>
        </div>
      )}
    </>
  );
}
