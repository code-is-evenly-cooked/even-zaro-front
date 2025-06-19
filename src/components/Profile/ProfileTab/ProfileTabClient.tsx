"use client";

import { useState } from "react";
import ProfileTabs from "./ProfileTabs";
import ProfileTabContent from "./ProfileTabContent";
import { ProfileTabType } from "@/types/profile";

const ProfileTabClient = ({ userId }: { userId: string }) => {
  const [activeTab, setActiveTab] = useState<ProfileTabType>("posts");

  return (
    <div>
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <ProfileTabContent activeTab={activeTab} userId={userId} />
    </div>
  );
};

export default ProfileTabClient;
