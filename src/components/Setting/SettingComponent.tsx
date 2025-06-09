"use client";

import { UserInfo } from "@/stores/useAuthStore";
import ProfileBaseInfoSection from "./ProfileBaseInfoSection";
import ProfileInfoSection from "./ProfileInfoSection";
import ProfileChangePassword from "./ProfileChangePassword";
import WithdrawConfirmModal from "./WithdrawConfirmModal";
import { useState } from "react";

interface SettingComponentProps {
  user: UserInfo;
}

const SettingComponent = ({ user }: SettingComponentProps) => {
  const [open, setOpen] = useState(false);

  const handleWithdraw = () => {
    setOpen(true);
  };

  const handleConfirm = (reason: string) => {
    // 탈퇴 API 호출

    console.log("탈퇴 사유:", reason);
    setOpen(false);
  };

  return (
    <div className="flex flex-col py-20 gap-4">
      <h1 className="text-2xl font-bold pb-4">계정 정보</h1>
      <ProfileBaseInfoSection user={user} />
      <ProfileInfoSection user={user} />
      <ProfileChangePassword />
      <button
        className="mt-6 text-sm text-gray600 underline item-center"
        onClick={handleWithdraw}
      >
        회원 탈퇴하기
      </button>

      {/* 탈퇴 확인 모달 */}
      <WithdrawConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default SettingComponent;
