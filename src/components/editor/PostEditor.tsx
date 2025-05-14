"use client";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef, useState } from "react";

export default function PostEditor() {
  const editorRef = useRef<Editor>(null);
  const [title, setTitle] = useState("");

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-xl shadow">
      {/* 제목 입력창 */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="w-full text-2xl font-semibold border-none outline-none placeholder-gray-400 mb-6"
      />

      {/* 본문 에디터 */}
      <Editor
        ref={editorRef}
        initialValue="테스트"
        previewStyle="vertical"
        height="400px"
        initialEditType="markdown"
        useCommandShortcut={true}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task"],
          ["link", "image"],
          ["code", "codeblock"],
        ]}
      />
      <div className="flex gap-2 justify-end">
        <button className="w-[80px] mt-4 px-4 py-2 bg-violet600 text-white rounded">
          등록
        </button>
        <button className="w-[80px] mt-4 px-4 py-2 bg-gray200 text-white rounded">
          취소
        </button>
      </div>
    </div>
  );
}
