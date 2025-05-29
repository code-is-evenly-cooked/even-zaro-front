"use client"

import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileTabs from "@/components/Profile/ProfileTabs";
import ProfileTabContent from "@/components/Profile/ProfileTabContent";

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <ProfileHeader />
            <ProfileTabs />
            <ProfileTabContent />
        </div>
    );
}