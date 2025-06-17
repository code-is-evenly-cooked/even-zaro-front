import { useEffect } from "react";

interface UseClickOutsideOptions {
  enableEscape?: boolean; // ESC 입력으로 닫기 기능 선택
}

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void,
  options: UseClickOutsideOptions = {},
) {
  const { enableEscape = false } = options;

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (enableEscape && event.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    if (enableEscape) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      if (enableEscape) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [ref, handler, enableEscape]);
}
