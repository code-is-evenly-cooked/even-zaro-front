"use client";

import { Editor as ToastEditorCore } from "@toast-ui/editor";
import { Editor } from "@toast-ui/react-editor";
import { useRef, useEffect, useState, useMemo, useLayoutEffect } from "react";
import { usePostStore } from "@/stores/usePostStore";
import { saveDraft, loadDraft } from "@/utils/editorStorage";
import BaseButton from "@/components/common/Button/BaseButton";
import { SaveIcon } from "lucide-react";
import "@toast-ui/editor/dist/i18n/ko-kr";
import CategoryDropdown from "@/components/Dropdown/CategoryDropdown";
import type { MainCategory } from "@/constants/categories";

export default function PostEditor() {
  const editorRef = useRef<Editor>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const {
    title,
    setTitle,
    mainCategory,
    setMainCategory,
    subCategory,
    setSubCategory,
  } = usePostStore();

  // 에디터 툴바 아이템 (모바일 구분)
  const [isMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 640;
    }
    return false;
  });

  const toolbarItems = useMemo(() => {
    return isMobile
      ? [
          ["heading", "bold", "strike"],
          ["link", "image"],
        ]
      : [
          ["heading", "bold", "italic", "strike"],
          ["link", "image"],
          ["hr", "quote"],
          ["ul", "ol", "task"],
        ];
  }, [isMobile]);

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

  // 툴바 아이템 툴팁 한글화
  ToastEditorCore.setLanguage("ko-KR", {
    Headings: "글씨 크기",
    Bold: "굵게",
    Italic: "기울임",
    Strike: "취소선",
    Link: "링크 삽입",
    Image: "이미지 삽입",
    Line: "가로선",
    Quote: "인용구",
    Task: "체크박스",
    "Ordered list": "번호 목록",
    "Unordered list": "글머리 기호",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useLayoutEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [mainCategory]);

  // 자동 임시 저장
  useEffect(() => {
    const interval = setInterval(() => {
      const content = editorRef.current?.getInstance().getMarkdown() ?? "";
      console.log("💾 저장 시도 내용:", {
        title,
        mainCategory,
        subCategory,
        content,
      });
      saveDraft({
        title,
        mainCategory,
        subCategory,
        content,
      });
      console.log("자동 임시저장됨");
    }, 5000); // 5초마다 자동 저장

    return () => clearInterval(interval);
  }, [title, mainCategory, subCategory]);

  // 임시 저장 자동 불러오기
  useEffect(() => {
    loadDraft().then((draft) => {
      if (draft) {
        setTitle(draft.title);
        setMainCategory(draft.mainCategory);
        setSubCategory(draft.subCategory);
        editorRef.current?.getInstance().setMarkdown(draft.content);
      }
    });
  }, [setTitle, setMainCategory, setSubCategory]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-3xl mx-auto p-4 bg-white rounded-xl shadow"
    >
      <div className="flex justify-between items-center">
        {/* 카테고리 선택 (임시) */}
        <div className="my-4">
          <CategoryDropdown
            selectedCategory={mainCategory ?? "전체"}
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={() => setIsDropdownOpen((prev) => !prev)}
            selectCategory={(c) => {
              setMainCategory(c as MainCategory); // 수정
              setSubCategory(null); // 메인 변경 시 서브 초기화
              setIsDropdownOpen(false);
            }}
            buttonRef={buttonRef}
            buttonWidth={buttonWidth}
          />
        </div>

        {/* 임시 저장 버튼 */}
        <div>
          <BaseButton
            type="button"
            leftIcon={<SaveIcon />}
            size="md"
            color="skyblue300"
            onClick={() => {
              const instance = editorRef.current?.getInstance();
              if (!instance) {
                console.warn("에디터 인스턴스를 찾을 수 없음");
                return;
              }

              const content = instance.getMarkdown();
              saveDraft({
                title,
                mainCategory,
                subCategory,
                content,
              });
              alert("임시 저장 완료!");
            }}
            className="p-1"
          >
            임시 저장
          </BaseButton>
        </div>
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
        language="ko-KR"
        initialValue=""
        previewStyle="vertical"
        height="400px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        toolbarItems={toolbarItems}
      />
      <div className="flex gap-2 justify-end">
        <BaseButton
          type="button"
          className="w-[80px] h-[40px] mt-4 px-4 py-2 bg-violet600 text-white rounded"
        >
          등록
        </BaseButton>
        <BaseButton
          type="button"
          className="w-[80px] h-[40px] mt-4 px-4 py-2 bg-gray200 text-white rounded"
        >
          취소
        </BaseButton>
      </div>
    </div>
  );
}
