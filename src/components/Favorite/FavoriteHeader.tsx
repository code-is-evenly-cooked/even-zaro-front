"use client";

import Image from "next/image";
import { getProfileImageUrl } from "@/utils/image";
import { differenceInDays } from "date-fns";
import { useProfile } from "@/hooks/useProfile";

interface Props {
  userId: number;
}

export default function FavoriteHeader({ userId }: Props) {
  const { data: profile, isLoading, error } = useProfile(userId);

  if (!userId || error || !profile)
    return (
      <div className="text-gray600">프로필 정보를 불러올 수 없습니다.</div>
    );
  if (isLoading) return <div className="text-gray600">로딩 중...</div>;

  const imageUrl = getProfileImageUrl(profile.profileImage);
  const days = differenceInDays(
    new Date(),
    new Date(profile.liveAloneDate ?? "2024-01-01"),
  );

  return (
    <div className="flex items-center gap-12 justify-center my-12">
      <Image
        src={imageUrl}
        alt="프로필 이미지"
        width={64}
        height={64}
        className="rounded-full object-cover"
      />
      <div className="flex flex-col items-start gap-1">
        <span className="text-xl font-bold">{profile.nickname}</span>
        <span className="text-xl text-gray600">D+{days}</span>
      </div>
    </div>
  );
}
