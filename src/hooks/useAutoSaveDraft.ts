import { useEffect, useRef, MutableRefObject } from "react";
import { usePostStore } from "@/stores/usePostStore";
import { Editor } from "@toast-ui/react-editor";
import { saveDraft } from "@/utils/editorStorage";
import { MainCategory, SubCategoryValue } from "@/types/category";

export function useAutoSaveDraft(editorRef: MutableRefObject<Editor | null>) {
  const { title, mainCategory, subCategory } = usePostStore();

  const prevDataRef = useRef<{
    title: string;
    mainCategory: MainCategory | null;
    subCategory: SubCategoryValue | null;
    content: string;
  }>({
    title: "",
    mainCategory: null,
    subCategory: null,
    content: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const content = editorRef.current?.getInstance().getMarkdown() ?? "";

      const hasChanged =
        prevDataRef.current.title !== title ||
        prevDataRef.current.mainCategory !== mainCategory ||
        prevDataRef.current.subCategory !== subCategory ||
        prevDataRef.current.content !== content;

      if (hasChanged) {
        console.log("💾 변경 감지, 임시 저장:", {
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

        prevDataRef.current = {
          title,
          mainCategory,
          subCategory,
          content,
        };
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [title, mainCategory, subCategory]);
}
