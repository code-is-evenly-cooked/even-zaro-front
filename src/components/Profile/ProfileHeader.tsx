"use client";

import Image from "next/image";
import { useAuthStore } from "@/stores/useAuthStore";
import { getProfileImageUrl } from "@/utils/image";

export default function ProfileHeader() {
  const { user } = useAuthStore();
  if (!user) return null;

  const imageUrl = getProfileImageUrl(user.profileImage);

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
        <div>
          <div className="flex">
            <div>닉네임</div>
            <span>디데이</span>
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
