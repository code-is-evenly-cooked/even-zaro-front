"use client";

import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileTabs from "@/components/Profile/ProfileTabs";
import ProfileTabContent from "@/components/Profile/ProfileTabContent";

export default function ProfilePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <ProfileHeader />
      <div className="flex flex-col max-w-3xl mx-auto">
        <ProfileTabs />
        <ProfileTabContent />
      </div>
    </div>
  );
}
