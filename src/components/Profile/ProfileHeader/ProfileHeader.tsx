"use client";

import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";
import { getProfileImageUrl } from "@/utils/image";
import { differenceInDays } from "date-fns";
import { SettingIcon } from "../../common/Icons";
import { useProfile } from "@/hooks/useProfile";
import { Stat } from "./Stat";

export default function ProfileHeader() {
  const { user } = useAuthStore();
  const userId = user?.userId ?? null;
  const { data: profile, isLoading, error } = useProfile(userId);

  if (!userId)
    return <div className="text-red-500">유효하지 않은 사용자입니다.</div>;
  if (isLoading) return <div className="text-gray600">로딩 중...</div>;
  if (error || !profile) return <div>프로필 정보를 불러오지 못했습니다.</div>;

  const imageUrl = getProfileImageUrl(profile.profileImage);

  // 자취 기간 디데이 표시
  const mockStartDate = profile.liveAloneDate ?? "2024-01-01"; // TODO: 작업 최종 완료 후 목업 데이터 제거 필요
  const days =
    mockStartDate != null
      ? differenceInDays(new Date(), new Date(mockStartDate))
      : null;

  return (
    <div className="py-4">
      <div className="flex gap-6 items-center justify-center">
        <Image
          src={imageUrl}
          alt="프로필 이미지"
          width={80}
          height={80}
          className="rounded-full object-cover m-6"
        />
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 text-xl">
            <span className="font-bold">{profile.nickname}</span>
            {days != null && <span className="text-gray600">D+{days}</span>}
            <button>
              <SettingIcon />
            </button>
          </div>
          <ul className="flex justify-around gap-16">
            <Stat label="글" count={profile.postCount} />
            <Stat label="팔로잉" count={profile.followingCount} />
            <Stat label="팔로워" count={profile.followerCount} />
          </ul>
        </div>
      </div>
    </div>
  );
}
