"use client";

import LoadingSpinnerBoundary from "@/components/common/LoadingSpinner/LoadingSpinnerBoundary";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PostContent = dynamic(() => import("@/components/post/PostContent"), {
  ssr: false,
});

interface Props {
  content: string;
}

export default function ClientPostContent({ content }: Props) {
  return (
    <Suspense fallback={<LoadingSpinnerBoundary />}>
      <PostContent content={content} />
    </Suspense>
  );
}
