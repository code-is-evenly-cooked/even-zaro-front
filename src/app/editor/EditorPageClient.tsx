"use client";

import dynamic from "next/dynamic";
import AuthGuard from "@/components/common/AuthGuard/AuthGuard";

const PostEditor = dynamic(() => import("@/components/editor/PostEditor"), {
  ssr: false,
});

export default function EditorWrapper() {
  return (
    <AuthGuard>
      <PostEditor />
    </AuthGuard>
  );
}
