import { useEffect } from "react";
import { loadDraft } from "@/utils/editorStorage";
import { usePostStore } from "@/stores/usePostStore";

export const useRestoreDraft = (editorRef: React.RefObject<any>) => {
  const { setTitle, setMainCategory, setSubCategory } = usePostStore();

  useEffect(() => {
    loadDraft().then((draft) => {
      if (!draft) return;

      const confirmRestore = window.confirm("임시 저장된 글이 있습니다. 불러오시겠습니까?");
      if (confirmRestore) {
        setTitle(draft.title);
        setMainCategory(draft.mainCategory);
        setSubCategory(draft.subCategory);
        editorRef.current?.getInstance().setMarkdown(draft.content);
      }
    });
  }, []);
};