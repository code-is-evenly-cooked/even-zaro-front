"use client";

import { useAuthStore, UserInfo } from "@/stores/useAuthStore";
import ProfileBaseInfoSection from "./ProfileBaseInfoSection";
import ProfileInfoSection from "./ProfileInfoSection";
import ProfileChangePassword from "./ProfileChangePassword";
import WithdrawConfirmModal from "./WithdrawConfirmModal";
import { useState } from "react";
import { withdrawUser } from "@/lib/api/profile";
import { logout } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

interface SettingComponentProps {
  user: UserInfo;
}

const SettingComponent = ({ user }: SettingComponentProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleWithdrawModal = () => {
    setOpen(true);
  };

  const handleConfirm = async (reason: string) => {
    try {
      await withdrawUser(reason);
      await logout();
      useAuthStore.getState().clearUser();
      router.push("/");
    } catch (e) {
      console.error(e);
      alert("탈퇴에 실패했습니다.");
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col py-20 gap-4">
      <h1 className="text-2xl font-bold pb-4">계정 정보</h1>
      <ProfileBaseInfoSection user={user} />
      <ProfileInfoSection user={user} />
      <ProfileChangePassword />
      <button
        className="mt-6 text-sm text-gray600 underline item-center"
        onClick={handleWithdrawModal}
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
