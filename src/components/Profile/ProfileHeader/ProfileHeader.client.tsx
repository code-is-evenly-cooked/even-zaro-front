"use client";

import dynamic from "next/dynamic";
import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";

const ProfileHeader = dynamic(() => import("./ProfileHeader"), {
  ssr: false,
  loading: () => <ProfileHeaderSkeleton />,
});

export default ProfileHeader;
