import { useRef, useEffect } from "react";
import type { Editor } from "@toast-ui/react-editor";

export function useEditorInit(
  editorRef: React.RefObject<Editor | null>,
  isReady: boolean,
  content: string,
) {
  const didInit = useRef(false);
  const searchParams = new URLSearchParams(window.location.search);
  const postId = searchParams.get("postId");

  useEffect(() => {
    const editor = editorRef.current?.getInstance();
    if (!editor) return;

    // 복원 전 상태: 빈 에디터로 초기화
    if (!isReady) {
      editor.setMarkdown("");
      return;
    }

    // 작성 모드: content 없이 빈 에디터
    if (!postId && !didInit.current) {
      editor.setMarkdown("");
      didInit.current = true;
    }

    // 수정 모드: postId가 있고 content가 준비되었을 때 삽입
    if (postId && content && !didInit.current) {
      editor.setMarkdown(content);
      didInit.current = true;
    }
  }, [isReady, content, editorRef]);
}
