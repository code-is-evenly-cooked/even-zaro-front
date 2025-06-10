"use client";

import BaseModal from "@/components/common/Modal/BaseModal";
import BaseButton from "@/components/common/Button/BaseButton";

interface RestoreDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RestoreDraftModal({
  isOpen,
  onClose,
  onConfirm,
}: RestoreDraftModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold">임시 저장된 글이 있습니다.</h2>
        <p className="text-sm text-gray600">불러오시겠습니까?</p>
        <div className="flex justify-end space-x-2">
          <BaseButton onClick={onClose}>아니요</BaseButton>
          <BaseButton
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-skyblue300 text-gray900 font-bold hover:bg-skyblue400"
          >
            예
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  );
}
