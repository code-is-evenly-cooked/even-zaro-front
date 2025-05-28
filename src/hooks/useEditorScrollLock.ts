import { useEffect } from "react";

export function useEditorScrollLock() {
  useEffect(() => {
    const el = document.querySelector(".ProseMirror.toastui-editor-contents");
    if (!el) return;

    const onWheel = (e: Event) => {
      const evt = e as WheelEvent;
      const target = evt.currentTarget as HTMLElement;

      const { scrollTop, scrollHeight, clientHeight } = target;
      const isScrollable = scrollHeight > clientHeight;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight === scrollHeight;

      if (!isScrollable || isAtTop || isAtBottom) {
        evt.preventDefault();
      }
    };

    const onTouchMove = (e: Event) => {
      const evt = e as TouchEvent;
      const target = evt.currentTarget as HTMLElement;

      const { scrollTop, scrollHeight, clientHeight } = target;
      const isScrollable = scrollHeight > clientHeight;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight === scrollHeight;

      if (!isScrollable || isAtTop || isAtBottom) {
        evt.preventDefault();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);
}
