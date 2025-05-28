"use client";

import { Editor as ToastEditorCore } from "@toast-ui/editor";
import { Editor } from "@toast-ui/react-editor";
import { useRef, useEffect, useState, useMemo, useLayoutEffect } from "react";
import { usePostStore } from "@/stores/usePostStore";
import { saveDraft } from "@/utils/editorStorage";
import BaseButton from "@/components/common/Button/BaseButton";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { useEditorImageUpload } from "@/hooks/useEditorImageUpload";
import { useAutoSaveDraft } from "@/hooks/useAutoSaveDraft";
import { createPost } from "@/lib/api/posts";
import { extractImageKeys, extractThumbnailKey } from "@/utils/editorImage";
import SubCategoryDropdown from "../Dropdown/SubCategoryDropdown";
import { MainCategory } from "@/types/category";
import { useRestoreDraft } from "@/hooks/useRestoreDraft";
import RestoreDraftModal from "./RestoreDraftModal";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEditorScrollLock } from "@/hooks/useEditorScrollLock";

export default function PostEditor() {
  const editorRef = useRef<Editor | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showToastMessage } = useToastMessageContext();
  const {
    title,
    content,
    mainCategory,
    subCategory,
    setTitle,
    setContent,
    setMainCategory,
    setSubCategory,
    setImageList,
    setThumbnailImage,
    resetPost,
  } = usePostStore();

  const searchParams = useSearchParams();
  const category = searchParams.get("category") as MainCategory | null;

  useEffect(() => {
    if (category) {
      setMainCategory(category);
    }
  }, [mainCategory, category, setMainCategory]);

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

  const [openDropdown, setOpenDropdown] = useState<"sub" | null>(null);
  const subButtonRef = useRef<HTMLButtonElement | null>(null);
  const subDropdownRef = useRef<HTMLUListElement | null>(null);
  const [subButtonWidth, setSubButtonWidth] = useState(0);

  useLayoutEffect(() => {
    if (subButtonRef.current) {
      setSubButtonWidth(subButtonRef.current.offsetWidth);
    }
  }, [subCategory, mainCategory]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        subButtonRef.current?.contains(target) ||
        subDropdownRef.current?.contains(target)
      ) {
        return;
      }
      setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEditorImageUpload(editorRef); // 이미지 업로드 관련 Hook
  useAutoSaveDraft(editorRef); // 자동 임시 저장 Hook

  const restore = useRestoreDraft(editorRef); // 임시 저장 불러오기

  // 에디터 내부 초기화
  useEffect(() => {
    const editor = editorRef.current?.getInstance();
    if (editor && !content) {
      editor.setMarkdown(""); // 진짜 초기화
    }
    // eslint-disable-next-line
  }, []);

  // 글 작성
  const handleSubmit = async () => {
    try {
      if (!title || !content) {
        showToastMessage({
          message: "제목, 내용을 입력해주세요.",
          type: "error",
        });
        return;
      }

      if (!mainCategory || !subCategory) {
        showToastMessage({
          message: "카테고리와 태그를 선택해주세요.",
          type: "error",
        });
        return;
      }

      const imageUrls = extractImageKeys(content);
      const thumbnail = extractThumbnailKey(content);

      setImageList(imageUrls);
      setThumbnailImage(thumbnail);

      const { category, postId } = await createPost({
        title,
        content,
        category: mainCategory,
        tag: subCategory,
        postImageList: imageUrls,
        thumbnailImage: thumbnail,
      });

      showToastMessage({
        message: "게시글 작성이 완료되었습니다!",
        type: "success",
      });
      resetPost(); // 상태 초기화
      router.replace(`/board/${category}/${postId}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다";

      showToastMessage({
        message: errorMessage,
        type: "error",
      });
    }
  };

  // 에디터 본문에서 외부 스크롤 차단
  useEditorScrollLock();

  return (
    <div
      ref={wrapperRef}
      className="relative w-full max-w-[836px] mx-auto p-4 bg-white rounded-xl shadow"
    >
      <div className="flex justify-between items-center">
        <div className="my-4 flex gap-2 items-center">
          {mainCategory && (
            <SubCategoryDropdown
              selectedMainCategory={mainCategory}
              selectedSubCategory={subCategory}
              isDropdownOpen={openDropdown === "sub"}
              toggleDropdown={() =>
                setOpenDropdown((prev) => (prev === "sub" ? null : "sub"))
              }
              selectSubCategory={(tag) => {
                setSubCategory(tag);
                setOpenDropdown(null);
              }}
              buttonRef={subButtonRef}
              dropdownRef={subDropdownRef}
              buttonWidth={subButtonWidth}
              showAllOption={false}
            />
          )}
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
        initialValue={content || ""}
        previewStyle="vertical"
        height="420px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        toolbarItems={toolbarItems}
        onChange={() =>
          setContent(editorRef.current?.getInstance().getMarkdown() ?? "")
        }
      />

      <div className="flex gap-2 items-center justify-end">
        <BaseButton
          type="button"
          size="md"
          variant="outlined"
          color="skyblue300"
          className="h-[44px] w-[120px] text-nowrap mt-4"
          onClick={() => {
            const instance = editorRef.current?.getInstance();
            if (!instance) {
              showToastMessage({
                message: "에디터 사용 중 문제가 발생했습니다.",
                type: "error",
              });
              return;
            }
            const content = instance.getMarkdown();
            saveDraft({ title, mainCategory, subCategory, content });
            showToastMessage({ message: "임시 저장 완료", type: "info" });
          }}
        >
          임시 저장
        </BaseButton>
        <BaseButton
          type="button"
          color="skyblue300"
          onClick={handleSubmit}
          className="h-[44px] w-[120px] text-nowrap mt-4"
        >
          등록
        </BaseButton>
      </div>
      {/* 임시 저장 불러오기 모달 */}
      <RestoreDraftModal
        isOpen={restore.isOpen}
        onClose={restore.onClose}
        onConfirm={restore.onConfirm}
      />
    </div>
  );
}
