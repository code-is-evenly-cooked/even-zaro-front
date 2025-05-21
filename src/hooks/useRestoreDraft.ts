import { useState, useEffect } from "react";
import { loadDraft } from "@/utils/editorStorage";
import { usePostStore } from "@/stores/usePostStore";
import type { Editor } from "@toast-ui/react-editor";
import type { PostDraft } from "@/types/editor";

export const useRestoreDraft = (editorRef: React.RefObject<Editor | null>) => {
  const { setTitle, setMainCategory, setSubCategory } = usePostStore();
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<PostDraft | null>(null);

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
