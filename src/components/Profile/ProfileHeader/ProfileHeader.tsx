"use client";

import Image from "next/image";
import { getProfileImageUrl } from "@/utils/image";
import { differenceInDays } from "date-fns";
import { SettingIcon } from "../../common/Icons";
import { Stat } from "./Stat";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/lib/api/profile";
import { ProfileResponse } from "@/types/profile";
import { useState } from "react";
import UserFollowModal, { FollowModalType } from "../Modal/UserFollowModal";

interface ProfileHeaderProps {
  userId: string;
}

export default function ProfileHeader({ userId }: ProfileHeaderProps) {
  const { data: profile } = useSuspenseQuery<ProfileResponse>({
    queryKey: ["profile", userId],
    queryFn: () => fetchUserProfile(userId),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const imageUrl = getProfileImageUrl(profile.profileImage);
  const [openType, setOpenType] = useState<FollowModalType | null>(null);

  // 자취 기간 디데이 표시
  const mockStartDate = profile.liveAloneDate ?? "2024-01-01"; // TODO: 작업 최종 완료 후 목업 데이터 제거 필요
  const days =
    mockStartDate != null
      ? differenceInDays(new Date(), new Date(mockStartDate))
      : null;

  return (
    <div className="py-4">
      <div className="flex sm:gap-6 gap-12 items-center justify-center">
        <Image
          src={imageUrl}
          alt="프로필 이미지"
          width={80}
          height={80}
          className="sm:block hidden rounded-full object-cover m-6"
        />
        <div className="sm:hidden flex flex-col">
          <Image
            src={imageUrl}
            alt="프로필 이미지"
            width={64}
            height={64}
            className="rounded-full object-cover m-4"
          />
          <span className="font-bold text-center">{profile.nickname}</span>
          {days != null && (
            <span className="text-gray600 text-center">D+{days}</span>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <div className="sm:flex hidden items-center gap-4 text-xl">
            <span className="font-bold">{profile.nickname}</span>
            {days != null && <span className="text-gray600">D+{days}</span>}
            <Link href="/setting">
              <SettingIcon />
            </Link>
          </div>
          <ul className="flex justify-around gap-16">
            <Stat label="글" count={profile.postCount} />
            <Stat
              label="팔로워"
              count={profile.followerCount}
              onClick={() => setOpenType("follower")}
            />
            <Stat
              label="팔로잉"
              count={profile.followingCount}
              onClick={() => setOpenType("following")}
            />
          </ul>
        </div>
      </div>
      {openType && (
        <UserFollowModal
          userId={userId}
          type={openType}
          isOpen
          onClose={() => setOpenType(null)}
        />
      )}
    </div>
  );
}
