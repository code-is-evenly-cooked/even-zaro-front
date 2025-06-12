"use client";

import { useState } from "react";
import BaseModal from "@/components/common/Modal/BaseModal";
import BaseButton from "@/components/common/Button/BaseButton";

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

  const handleSubmit = () => {
    const trimmed = groupName.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setGroupName("");
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold">새 그룹 만들기</h2>
        <input
          type="text"
          placeholder="그룹 이름을 입력하세요"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <div className="flex justify-end space-x-2">
          <BaseButton color="violet300" onClick={onClose}>
            취소
          </BaseButton>
          <BaseButton color="violet800" onClick={handleSubmit}>
            추가
          </BaseButton>
        </div>
      </div>
    </BaseModal>
  );
}
