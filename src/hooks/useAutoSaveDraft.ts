import { useEffect, useRef, MutableRefObject } from "react";
import { usePostStore } from "@/stores/usePostStore";
import { Editor } from "@toast-ui/react-editor";
import { saveDraft } from "@/utils/editorStorage";

export function useAutoSaveDraft(editorRef: MutableRefObject<Editor | null>) {
  const { title } = usePostStore();

  const prevDataRef = useRef<{
    title: string;
    content: string;
  }>({
    title: "",
    content: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const content = editorRef.current?.getInstance().getMarkdown() ?? "";

      const hasChanged =
        prevDataRef.current.title !== title ||
        prevDataRef.current.content !== content;

      if (hasChanged) {
        console.log("💾 변경 감지, 임시 저장:", {
          title,
          content,
        });

        saveDraft({
          title,
          content,
        });

        prevDataRef.current = {
          title,
          content,
        };
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [title, editorRef]);
}
