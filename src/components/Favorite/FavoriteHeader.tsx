"use client";

import Image from "next/image";
import { getProfileImageUrl } from "@/utils/image";
import { differenceInDays } from "date-fns";
import { useProfile } from "@/hooks/useProfile";
import AppErrorBoundary from "@/components/common/ErrorBoundary/ErrorBoundary";
import LoadingSpinnerBoundary from "@/components/common/LoadingSpinner/LoadingSpinnerBoundary";

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
            <span className="text-xl text-gray600">
              D+
              {differenceInDays(
                new Date(),
                new Date(profile.liveAloneDate ?? "2024-01-01"), // TODO: 작업 최종 완료 후 목업 데이터 제거 필요
              )}
            </span>
          </div>
        </div>
      )}
    </AppErrorBoundary>
  );
}
