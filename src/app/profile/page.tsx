"use client";

import { useState } from "react";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileTabs from "@/components/Profile/ProfileTabs";
import ProfileTabContent from "@/components/Profile/ProfileTabContent";
import { ProfileTabType } from "@/types/profile";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<ProfileTabType>("bookmarks");
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ProfileHeader />
      <div className="flex flex-col max-w-3xl mx-auto">
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <ProfileTabContent activeTab={activeTab} />
      </div>
    </div>
  );
}
