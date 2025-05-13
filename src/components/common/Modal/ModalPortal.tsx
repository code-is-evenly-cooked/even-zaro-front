"use client";

import { useEffect, useState } from "react";

import { createPortal } from "react-dom";

/**
 * 모달용 Portal 컴포넌트
 *
 * 1. SSR 대응:
 *    - mounted 상태를 통해 클라이언트 사이드 렌더링 보장
 *    - document.body가 없는 서버 환경에서 오류 방지
 *
 * 2. DOM 계층:
 *    - 모달을 body 직접 하위에 렌더링하여 z-index 문제 해결
 *    - 스타일 상속 문제 방지
 */
const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted
    ? createPortal(
        children,
        document.getElementById("root-modal") || document.body,
      )
    : null;
};

export default ModalPortal;
