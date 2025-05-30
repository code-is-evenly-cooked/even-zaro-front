"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const PostContent = dynamic(() => import("@/components/post/PostContent"), { ssr: false });

interface Props {
  content: string;
}

export default function ClientPostContent({ content }: Props) {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PostContent content={content} />
    </Suspense>
  );
}