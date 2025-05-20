import { useState, useEffect } from "react";
import { loadDraft } from "@/utils/editorStorage";
import { usePostStore } from "@/stores/usePostStore";

export const useRestoreDraft = (editorRef: React.RefObject<any>) => {
  const { setTitle, setMainCategory, setSubCategory } = usePostStore();
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<any>(null); // 타입 정의 가능

  useEffect(() => {
    loadDraft().then((saved) => {
      if (saved) {
        setDraft(saved);
        setIsOpen(true); // 모달 열기
      }
    });
  }, []);

  const handleConfirm = () => {
    if (draft) {
      setTitle(draft.title);
      setMainCategory(draft.mainCategory);
      setSubCategory(draft.subCategory);
      editorRef.current?.getInstance().setMarkdown(draft.content);
    }
    setIsOpen(false);
  };

  const handleClose = () => setIsOpen(false);

  return { isOpen, onClose: handleClose, onConfirm: handleConfirm };
};
