"use client";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useRef } from "react";
import { usePostStore } from "@/stores/usePostStore";

export default function PostEditor() {
  const editorRef = useRef<Editor>(null);
  const { title, setTitle, category, setCategory } = usePostStore();

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-xl shadow">
      {/* 카테고리 선택 (임시) */}
      <div className="my-4">
        <select
          value={category ?? ""}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 p-1 bg-violet300 rounded-lg"
        >
          <option value="">게시판 선택</option>
          <option value="자취일상">자취일상</option>
          <option value="같이쓰자">같이쓰자</option>
        </select>
      </div>
      {/* 제목 입력창 */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        className="w-full h-[60px] text-2xl font-semibold outline-none placeholder-gray-400 mb-6 px-3 py-2 rounded-md bg-white shadow-[0_1px_4px_rgba(0,0,0,0.1)] focus:shadow-[0_2px_6px_rgba(0,0,0,0.2)] transition"
      />

      {/* 본문 에디터 */}
      <Editor
        ref={editorRef}
        initialValue="테스트"
        previewStyle="vertical"
        height="400px"
        initialEditType="wysiwyg"
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
