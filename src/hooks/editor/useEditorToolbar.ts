import { useMemo, useState } from "react";
import { Editor as ToastEditorCore } from "@toast-ui/editor";

export function useEditorToolbar() {
  const [isMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 640;  // 모바일 sm 기준 (640px)
    }
    return false;
  });

  const toolbarItems = useMemo(() => {
    return isMobile
      ? [
          ["heading", "bold", "strike"],
          ["link", "image"],
        ]
      : [
          ["heading", "bold", "italic", "strike"],
          ["link", "image"],
          ["hr", "quote"],
          ["ul", "ol", "task"],
        ];
  }, [isMobile]);

  // 툴팁 한글화 적용
  ToastEditorCore.setLanguage("ko-KR", {
    Headings: "글씨 크기",
    Bold: "굵게",
    Italic: "기울임",
    Strike: "취소선",
    Link: "링크 삽입",
    Image: "이미지 삽입",
    Line: "가로선",
    Quote: "인용구",
    Task: "체크박스",
    "Ordered list": "번호 목록",
    "Unordered list": "글머리 기호",
  });

  return { toolbarItems };
}
