import ProfileHeaderSkeleton from "@/components/Profile/ProfileHeader/ProfileHeaderSkeleton";
import React from "react";

const loading = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ProfileHeaderSkeleton />
    </div>
  );
};

export default loading;
