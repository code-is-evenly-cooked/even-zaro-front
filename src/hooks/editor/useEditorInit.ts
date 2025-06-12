import { useRef, useEffect } from "react";
import type { Editor } from "@toast-ui/react-editor";

export function useEditorInit(
  editorRef: React.RefObject<Editor | null>,
  isReady: boolean,
  content: string,
) {
  const didInit = useRef(false); // 최초 1회만 초기화

  useEffect(() => {
    const editor = editorRef.current?.getInstance();
    if (!editor) return;

    // 복원 전 상태: 빈 화면으로 초기화
    if (!isReady) {
      editor.setMarkdown(""); // 에디터 초기 상태 표시
      return;
    }

    // 복원 완료 후 최초 1회만 내용 반영
    if (!didInit.current) {
      editor.setMarkdown(content || "");
      didInit.current = true;
    }
  }, [isReady, content, editorRef]);
}
