import { useEffect, RefObject } from "react";

export function useDropdownClose(
  refs: RefObject<HTMLElement | null>[],
  onClose: () => void,
) {
  useEffect(() => {
    // SSR 환경 방지
    if (typeof window === "undefined") return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      const isInsideAnyRef = refs.some(
        (ref) => ref.current && ref.current.contains(target),
      );

      if (!isInsideAnyRef) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [refs, onClose]);
}
