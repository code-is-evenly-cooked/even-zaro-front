"use client";

import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";
import { getProfileImageUrl } from "@/utils/image";
import { differenceInDays } from "date-fns";

export default function ProfileHeader() {
  const { user } = useAuthStore();
  if (!user) return null;

  const imageUrl = getProfileImageUrl(user.profileImage);

  // 자취 기간 디데이 표시
  const mockStartDate = user.liveAloneDate ?? "2024-01-01"; // 임시 목업 데이터
  const days =
    user.liveAloneDate != null
      ? differenceInDays(new Date(), new Date(mockStartDate))
      : null;

  return (
    <div>
      <div className="flex items-center">
        <Image
          src={imageUrl}
          alt="프로필 이미지"
          width={64}
          height={64}
          className="rounded-full object-cover m-6"
        />
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold">{user.nickname}</span>
            {days != null && <span>D+{days}</span>}
            <div>톱니버튼</div>
          </div>
          <div className="flex gap-4">
            <div>글</div>
            <div>팔로잉</div>
            <div>팔로워</div>
          </div>
        </div>
      </div>
    </div>
  );
}
