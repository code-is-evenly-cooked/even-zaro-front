"use client";

import { Editor } from "@toast-ui/react-editor";
import { RefObject } from "react";

interface EditorContentProps {
  editorRef: RefObject<Editor | null>;
  title: string;
  setTitle: (v: string) => void;
  setContent: (v: string) => void;
  toolbarItems: string[] | string[][];
  isReady: boolean;
}

export default function EditorContent({
  editorRef,
  title,
  setTitle,
  setContent,
  toolbarItems,
  isReady,
}: EditorContentProps) {
  return (
    <>
      {/* 제목 입력창 */}
      <input
        type="text"
        value={isReady ? title : ""}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="w-full h-[60px] text-2xl font-semibold outline-none placeholder-gray-400 mb-6 px-3 py-2 rounded-md bg-white shadow-[0_1px_4px_rgba(0,0,0,0.1)] focus:shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition"
      />

      {/* 본문 에디터 */}
      <Editor
        ref={editorRef}
        language="ko-KR"
        initialValue=""
        previewStyle="vertical"
        height="420px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        toolbarItems={toolbarItems}
        onChange={() =>
          setContent(editorRef.current?.getInstance().getMarkdown() ?? "")
        }
      />
    </>
  );
}
