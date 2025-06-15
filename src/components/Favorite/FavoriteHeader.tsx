"use client";

import Image from "next/image";
import { getProfileImageUrl } from "@/utils/image";
import { useProfile } from "@/hooks/useProfile";
import AppErrorBoundary from "@/components/common/ErrorBoundary/ErrorBoundary";
import LoadingSpinnerBoundary from "@/components/common/LoadingSpinner/LoadingSpinnerBoundary";
import { getDdayLabel } from "@/utils/date";

interface Props {
  userId: number;
}

export default function FavoriteHeader({ userId }: Props) {
  const { data: profile, isLoading } = useProfile(userId);

  if (isLoading) return <LoadingSpinnerBoundary />;

  return (
    <AppErrorBoundary fallbackMessage="프로필 정보를 불러오는 중 오류가 발생했습니다.">
      {!userId || !profile ? (
        <div className="text-gray600">프로필 정보를 불러올 수 없습니다.</div>
      ) : (
        <div className="flex items-center sm:gap-12 gap-8 justify-center my-8">
          <Image
            src={getProfileImageUrl(profile.profileImage)}
            alt="프로필 이미지"
            width={80}
            height={80}
            className="sm:block hidden rounded-full object-cover"
          />
          <Image
            src={getProfileImageUrl(profile.profileImage)}
            alt="프로필 이미지"
            width={64}
            height={64}
            className="sm:hidden block rounded-full object-cover"
          />
          <div className="flex flex-col items-start gap-2">
            <span className="text-xl font-bold">{profile.nickname}</span>
            {profile.liveAloneDate && (
              <span className="text-xl text-gray600">
                {getDdayLabel(profile.liveAloneDate)}
              </span>
            )}
          </div>
        </div>
      )}
    </AppErrorBoundary>
  );
}
