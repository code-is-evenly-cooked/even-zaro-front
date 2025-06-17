"use client";

import Image from "next/image";
import { getProfileImageUrl } from "@/utils/image";
import { SettingIcon } from "../../common/Icons";
import { Stat } from "./Stat";
import Link from "next/link";
import { ProfileResponse } from "@/types/profile";
import { useCallback, useState } from "react";
import UserFollowModal, { FollowModalType } from "../Modal/UserFollowModal";
import { getDdayLabel } from "@/utils/date";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { followUser, unfollowUser } from "@/lib/api/follow";

interface ProfileHeaderProps {
  profile: ProfileResponse;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const { user } = useAuthStore();
  const { showToastMessage } = useToastMessageContext();
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const imageUrl = getProfileImageUrl(profile.profileImage);
  const [openType, setOpenType] = useState<FollowModalType | null>(null);

  const handleClickStat = useCallback(
    (type: FollowModalType) => {
      if (user === null) {
        showToastMessage({ type: "info", message: "로그인이 필요합니다." });
      } else {
        setOpenType(type);
      }
    },
    [user, showToastMessage],
  );

  const handleToggleFollow = useCallback(async () => {
    const prev = isFollowing;

    setIsFollowing(!prev);

    setIsLoading(true);
    try {
      await (prev ? unfollowUser(profile.userId) : followUser(profile.userId));
    } catch {
      setIsFollowing(prev); // 실패 시 롤백
    } finally {
      setIsLoading(false);
    }
  }, [isFollowing, profile.userId]);

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
          <span className="text-gray600 text-center">
            {getDdayLabel(profile.liveAloneDate)}
          </span>
        </div>
        <div className="flex flex-col gap-6">
          <div className="sm:flex hidden items-center gap-4 text-xl">
            <span className="font-bold">{profile.nickname}</span>
            {profile.liveAloneDate != null && (
              <span className="text-gray600">
                {getDdayLabel(profile.liveAloneDate)}
              </span>
            )}
            {profile.isMine && (
              <Link href="/setting">
                <SettingIcon />
              </Link>
            )}
          </div>
          <ul className="flex justify-around gap-16">
            <Stat label="글" count={profile.postCount} />
            <Stat
              label="팔로워"
              count={profile.followerCount}
              onClick={() => handleClickStat("follower")}
            />
            <Stat
              label="팔로잉"
              count={profile.followingCount}
              onClick={() => handleClickStat("following")}
            />
          </ul>
          <button
            onClick={handleToggleFollow}
            disabled={isLoading}
            className={`flex items-center justify-center text-sm px-8 py-2 rounded-xl ${
              isFollowing
                ? "bg-gray200 text-gray900 hover:bg-opacity-70"
                : "bg-violet300 text-gray900 hover:bg-opacity-70"
            }`}
          >
            {isLoading ? <LoadingSpinner /> : isFollowing ? "팔로잉" : "팔로우"}
          </button>
        </div>
      </div>
      {openType && (
        <UserFollowModal
          userId={`${profile.userId}`}
          type={openType}
          isOpen
          onClose={() => setOpenType(null)}
        />
      )}
    </div>
  );
}
