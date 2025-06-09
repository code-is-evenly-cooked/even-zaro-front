"use client";

import { useState } from "react";
import { useModal } from "@/hooks/useModal";

interface AddFavoriteGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (groupName: string) => void;
}

export default function AddFavoriteGroupModal({
  isOpen,
  onClose,
  onSubmit,
}: AddFavoriteGroupModalProps) {
  const [groupName, setGroupName] = useState("");

  useModal({ isOpen, onClose }); // 외부 클릭 시 닫기 등 공통 처리

  const handleSubmit = () => {
    const trimmed = groupName.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setGroupName(""); // 입력 초기화
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl mx-4 p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold">새 그룹 만들기</h2>
        <p className="text-sm text-gray600 mt-2">그룹 이름을 입력해주세요.</p>

        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="예: 내가 저장한 맛집"
          className="mt-4 px-3 py-2 border rounded w-full text-sm"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray200 text-sm"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="px-7 py-2 rounded bg-violet600 text-white text-sm font-bold hover:bg-violet700"
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
}
