"use client";

import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";
import { getProfileImageUrl } from "@/utils/image";
import { differenceInDays } from "date-fns";
import { SettingIcon } from "../common/Icons";
import { useProfile } from "@/hooks/useProfile";

export default function ProfileHeader() {
  const { user } = useAuthStore();
  const userId = user?.userId ?? null;

  const { data: profile, isLoading, error } = useProfile(userId);
  if (isLoading) return <div className="text-gray600">로딩 중...</div>;
  if (error || !profile) return <div>프로필 정보를 불러오지 못했습니다.</div>;

  const imageUrl = getProfileImageUrl(profile.profileImage);

  // 자취 기간 디데이 표시
  const mockStartDate = profile.liveAloneDate ?? "2024-01-01"; // 임시 목업 데이터
  const days =
    mockStartDate != null
      ? differenceInDays(new Date(), new Date(mockStartDate))
      : null;

  return (
    <div>
      <div className="flex gap-6 items-center justify-center">
        <Image
          src={imageUrl}
          alt="프로필 이미지"
          width={80}
          height={80}
          className="rounded-full object-cover m-6"
        />
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-xl">
            <span className="font-bold">{profile.nickname}</span>
            {days != null && <span className="text-gray600">D+{days}</span>}
            <button>
              <SettingIcon />
            </button>
          </div>
          <div className="flex justify-around gap-20">
            <div>
              글<span className="ml-2 font-bold">{profile.postCount}</span>
            </div>
            <div>
              팔로잉
              <span className="ml-2 font-bold">{profile.followingCount}</span>
            </div>
            <div>
              팔로워
              <span className="ml-2 font-bold">{profile.followerCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
