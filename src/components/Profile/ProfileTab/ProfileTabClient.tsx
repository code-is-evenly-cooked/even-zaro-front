"use client";

import { useState } from "react";
import ProfileTabs from "./ProfileTabs";
import ProfileTabContent from "./ProfileTabContent";
import { ProfileTabType } from "@/types/profile";

const ProfileTabClient = () => {
  const [activeTab, setActiveTab] = useState<ProfileTabType>("posts");

  return (
    <div>
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <ProfileTabContent activeTab={activeTab} />
    </div>
  );
};

export default ProfileTabClient;
