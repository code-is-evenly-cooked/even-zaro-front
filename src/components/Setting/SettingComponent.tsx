"use client";

import { UserInfo } from "@/stores/useAuthStore";
import ProfileBaseInfoSection from "./ProfileBaseInfoSection";
import ProfileInfoSection from "./ProfileInfoSection";

interface SettingComponentProps {
  user: UserInfo;
}

const SettingComponent = ({ user }: SettingComponentProps) => {
  return (
    <div className="flex flex-col py-20 gap-4">
      <h1 className="text-2xl font-bold pb-4">계정 정보</h1>
      <ProfileBaseInfoSection user={user} />
      <ProfileInfoSection user={user} />
    </div>
  );
};

export default SettingComponent;
