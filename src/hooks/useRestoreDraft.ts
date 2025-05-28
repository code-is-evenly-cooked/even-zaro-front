import { useState, useEffect } from "react";
import { loadDraft, clearDraft } from "@/utils/editorStorage";
import { usePostStore } from "@/stores/usePostStore";
import type { Editor } from "@toast-ui/react-editor";
import type { PostDraft } from "@/types/editor";

export const useRestoreDraft = (editorRef: React.RefObject<Editor | null>) => {
  const { setMainCategory, setSubCategory, setTitle, setContent, resetPost } =
    usePostStore();

  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<PostDraft | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadDraft().then((saved) => {
      if (saved) {
        setDraft(saved);
        setIsOpen(true); // 모달 열기
      } else {
        setIsReady(true);
      }
    });
  }, []);

  // "예" 선택 시
  const handleConfirm = () => {
    if (draft) {
      setMainCategory(draft.mainCategory);
      setSubCategory(draft.subCategory);
      setTitle(draft.title);
      setContent(draft.content);
      editorRef.current?.getInstance().setMarkdown(draft.content);
      clearDraft();
    }
    setIsOpen(false);
    setIsReady(true);
  };

  // "아니오" 선택 시
  const handleClose = () => {
    editorRef.current?.getInstance().setMarkdown("");
    resetPost(); // 상태 초기화
    clearDraft(); // indexedDB 삭제
    setIsOpen(false); // 모달 닫기
    setIsReady(true);
  };

  return { isOpen, onClose: handleClose, onConfirm: handleConfirm, isReady };
};
