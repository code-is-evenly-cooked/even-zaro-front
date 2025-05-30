"use client";

import { BaseModalProps } from "@/types/modal";

import ModalOverlay from "./ModalOverlay";
import ModalPortal from "./ModalPortal";
import IconButton from "../Button/IconButton";
import { CloseIcon } from "../Icons";
import { useModal } from "@/hooks/useModal";

/**
 * 기본 모달 컴포넌트
 *
 * 특징:
 * 1. 재사용성: 모든 모달의 기본 구조를 제공
 * 2. 접근성: 키보드 네비게이션 및 aria 속성 지원
 * 3. Portal: React Portal을 통한 DOM 계층 분리
 *
 * 사용예시:
 * <BaseModal isOpen={isOpen} onClose={handleClose}>
 *   <div>모달 내용</div>
 * </BaseModal>
 */

const BaseModal = ({ isOpen, onClose, children }: BaseModalProps) => {
  // 모달 관련 공통 로직 (키보드, 스크롤 제어 등)
  useModal({ isOpen, onClose });

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
      >
        <ModalOverlay
          onClose={onClose}
          className="bg-black-750 backdrop-blur-sm"
        />
        <div className="relative animate-modalSlideIn rounded-3xl border border-violet300  bg-white backdrop-blur-[20px] py-9 px-4 min-w-[20rem] min-h-[5rem] max-h-screen overflow-auto">
          <IconButton
            icon={<CloseIcon />}
            label="모달 닫기"
            onClick={onClose}
            isTransparent
            className="absolute top-4 right-4 z-10"
          />
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default BaseModal;
