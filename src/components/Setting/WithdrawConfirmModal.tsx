"use client";
import { useState } from "react";
import BaseModal from "../common/Modal/BaseModal";
import TextInput from "../common/Input/TextInput";

export default function WithdrawConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <p className="text-lg font-semibold text-center">
          정말 탈퇴하시겠어요?
        </p>
        <TextInput
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="(선택) 탈퇴 사유를 입력해주세요"
          className="w-full px-3 py-3"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray200 hover:bg-gray100 rounded transition-colors"
          >
            취소
          </button>
          <button
            onClick={() => onConfirm(reason)}
            className="px-4 py-2 bg-red500 hover:bg-red200 text-white rounded transition-colors"
          >
            탈퇴
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
