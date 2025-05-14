"use client";

import dynamic from "next/dynamic";

const PostEditor = dynamic(() => import("@/components/editor/PostEditor"), {
  ssr: false,
});

export default function EditorWrapper() {
  return <PostEditor />;
}
