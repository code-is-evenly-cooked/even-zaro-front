"use client";

import BaseModal from "@/components/common/Modal/BaseModal";
import BaseButton from "@/components/common/Button/BaseButton";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title = "정말 삭제하시겠어요?",
  description = "삭제하면 되돌릴 수 없습니다.",
}: ConfirmDeleteModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray600">{description}</p>
        <div className="flex justify-end space-x-2">
          <BaseButton onClick={onClose} color="violet300">
            취소
          </BaseButton>
          <BaseButton
            onClick={() => {
              onConfirm();
              onClose();
            }}
            color="violet800"
          >
            삭제
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  );
}
