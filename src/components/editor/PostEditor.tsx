"use client";

import { Editor } from "@toast-ui/react-editor";
import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePostStore } from "@/stores/usePostStore";
import { MainCategory } from "@/types/category";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { useEditorImageUpload } from "@/hooks/useEditorImageUpload";
import { useAutoSaveDraft } from "@/hooks/useAutoSaveDraft";
import { useEditorScrollLock } from "@/hooks/useEditorScrollLock";
import { useEditorToolbar } from "@/hooks/editor/useEditorToolbar";
import { useDropdownClose } from "@/hooks/editor/useDropdownClose";
import { useEditorInit } from "@/hooks/editor/useEditorInit";
import { usePostSubmitHandler } from "@/hooks/editor/usePostSubmitHandler";
import { useRestoreDraft } from "@/hooks/useRestoreDraft";
import EditorHeader from "@/components/editor/EditorHeader";
import EditorContent from "@/components/editor/EditorContent";
import EditorActions from "@/components/editor/EditorActions";
import RestoreDraftModal from "./RestoreDraftModal";

export default function PostEditor() {
  const editorRef = useRef<Editor | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const subButtonRef = useRef<HTMLButtonElement | null>(null);
  const subDropdownRef = useRef<HTMLUListElement | null>(null);

  const [openDropdown, setOpenDropdown] = useState<"sub" | null>(null);
  const [subButtonWidth, setSubButtonWidth] = useState(0);

  const {
    title,
    content,
    mainCategory,
    subCategory,
    setTitle,
    setContent,
    setMainCategory,
    setSubCategory,
  } = usePostStore();

  const { showToastMessage } = useToastMessageContext();
  const { toolbarItems } = useEditorToolbar();
  const { handleSubmit } = usePostSubmitHandler();

  const searchParams = useSearchParams();
  const category = searchParams.get("category") as MainCategory | null;
  const restore = useRestoreDraft(editorRef);

  useEditorImageUpload(editorRef); // 이미지 업로드 관련 Hook
  useAutoSaveDraft(editorRef); // 자동 임시 저장 Hook
  useEditorInit(editorRef, restore.isReady, content); // 에디터 초기화
  useEditorScrollLock(); // 외부 스크롤 차단
  useDropdownClose([subButtonRef, subDropdownRef], () => setOpenDropdown(null)); // 드롭다운 외부 클릭 감지

  useEffect(() => {
    if (category) {
      setMainCategory(category);
    }
  }, [mainCategory, category, setMainCategory]);

  // 에디터 내부 UI 변경 (한글화)
  useEffect(() => {
    const timer = setTimeout(() => {
      const root = editorRef.current?.getRootElement();
      if (!root) return;

      const switchContainer = root.querySelector(".toastui-editor-mode-switch");
      if (switchContainer) {
        const tabItems = switchContainer.querySelectorAll(".tab-item");
        if (tabItems.length === 2) {
          tabItems[0].textContent = "마크다운";
          tabItems[1].textContent = "편집모드";
        }
      }
    }, 0); // 렌더가 완료된 다음으로 미룸 (완전 중요!!)

    return () => clearTimeout(timer);
  }, [toolbarItems]);

  useLayoutEffect(() => {
    if (subButtonRef.current) {
      setSubButtonWidth(subButtonRef.current.offsetWidth);
    }
  }, [subCategory, mainCategory]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-[836px] mx-auto p-4 bg-white rounded-xl shadow"
    >
      {/* 카테고리 드롭 다운 */}
      <EditorHeader
        mainCategory={mainCategory}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        subButtonRef={subButtonRef}
        subDropdownRef={subDropdownRef}
        subButtonWidth={subButtonWidth}
      />

      {/* 제목 + 본문 에디터 */}
      <EditorContent
        editorRef={editorRef}
        title={title}
        setTitle={setTitle}
        setContent={setContent}
        toolbarItems={toolbarItems}
        isReady={restore.isReady}
      />

      {/* 글쓰기 에디터 액션 버튼 */}
      <EditorActions
        editorRef={editorRef}
        title={title}
        showToastMessage={showToastMessage}
        onSubmit={handleSubmit}
      />

      {/* 임시 저장 불러오기 모달 */}
      <RestoreDraftModal
        isOpen={restore.isOpen}
        onClose={restore.onClose}
        onConfirm={restore.onConfirm}
      />
    </div>
  );
}
