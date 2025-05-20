import { useModal } from "@/hooks/useModal";

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
  useModal({ isOpen, onClose });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold">임시 저장된 글이 있습니다.</h2>
        <p className="text-sm text-gray-600 mt-2">불러오시겠습니까?</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-sm"
          >
            아니요
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-violet600 text-white text-sm"
          >
            예
          </button>
        </div>
      </div>
    </div>
  );
}
