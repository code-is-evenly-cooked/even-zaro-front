import { useEffect, MutableRefObject } from "react";
import { usePostStore } from "@/stores/usePostStore";
import { Editor } from "@toast-ui/react-editor";
import { saveDraft } from "@/utils/editorStorage";

export function useAutoSaveDraft(editorRef: MutableRefObject<Editor | null>) {
  const { title, mainCategory, subCategory } = usePostStore();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, mainCategory, subCategory]);
}
