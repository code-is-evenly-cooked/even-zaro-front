"use client";

import ProfileInfoSection from "./ProfileInfoSection";

const SettingComponent = () => {
  return (
    <div className="flex flex-col py-20 gap-4">
      <h1 className="text-2xl font-bold pb-4">계정 정보</h1>
      <ProfileInfoSection />
    </div>
  );
};

export default SettingComponent;
