"use client";

import { useModal } from "@/hooks/useModal";

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
  useModal({ isOpen, onClose });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl mx-4 p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray600 mt-2">{description}</p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray200 text-sm"
          >
            취소
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-7 py-2 rounded bg-red-500 text-white text-sm font-bold hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
