import { useState, useEffect } from "react";
import { loadDraft, clearDraft } from "@/utils/editorStorage";
import { usePostStore } from "@/stores/usePostStore";
import type { Editor } from "@toast-ui/react-editor";
import type { PostDraft } from "@/types/editor";

/**
 * @param editorRef - 에디터 ref
 * @param isEditMode - 수정 모드 여부 (true = 임시저장 무시)
 */

export const useRestoreDraft = (
  editorRef: React.RefObject<Editor | null>,
  isEditMode: boolean,
) => {
  const { setTitle, setContent, resetPost } = usePostStore();
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<PostDraft | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 게시글 수정 모드에서는 임시 저장을 불러오지 않음
    if (isEditMode) {
      setIsReady(true);
      return;
    }

    loadDraft().then((saved) => {
      // 임시 저장 값이 비어있는 지 확인
      const isValidDraft =
        saved &&
        (saved.title?.trim().length > 0 || saved.content?.trim().length > 0);

      if (isValidDraft) {
        setDraft(saved);
        setIsOpen(true); // 모달 열기
      } else {
        clearDraft();
        setIsReady(true);
      }
    });
  }, [isEditMode]);

  // "예" 선택 시
  const handleConfirm = () => {
    if (draft) {
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
