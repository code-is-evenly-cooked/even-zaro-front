import { useRef, useEffect } from "react";
import type { Editor } from "@toast-ui/react-editor";

export function useEditorInit(
  editorRef: React.RefObject<Editor>,
  isReady: boolean,
  content: string
) {
  const didInit = useRef(false); // 최초 1회만 초기화

  useEffect(() => {
    if (!isReady || didInit.current) return;

    const editor = editorRef.current?.getInstance();
    if (!editor) return;

    editor.setMarkdown(content || "");
    didInit.current = true;
  }, [isReady, content, editorRef]);
}
