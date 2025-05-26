"use client";

import { useEffect, useRef, useState } from "react";
import PostFooter from "./PostFooter";

interface Props {
  postId: number;
  likeCount: number;
  commentCount: number;
}

export default function PostFooterWithFloating({ postId, likeCount, commentCount }: Props) {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [showFloatingFooter, setShowFloatingFooter] = useState(true);

  useEffect(() => {
    if (!footerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingFooter(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 본문 하단 고정 푸터 (관측 대상) */}
      <div ref={footerRef}>
        <PostFooter postId={postId} likeCount={likeCount} commentCount={commentCount} />
      </div>

      {/* 플로팅 푸터 */}
      {showFloatingFooter && (
        <div className="fixed bottom-0 left-0 w-full z-50 border-t bg-white shadow-md">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <PostFooter postId={postId} likeCount={likeCount} commentCount={commentCount} />
          </div>
        </div>
      )}
    </>
  );
}
