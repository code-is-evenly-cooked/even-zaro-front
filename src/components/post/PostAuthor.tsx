"use client";

import { differenceInDays } from "date-fns";
import { getProfileImageUrl } from "@/utils/image";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchFollowings, followUser, unfollowUser } from "@/lib/api/follow";

interface PostAuthorProps {
  nickname: string;
  profileImage: string | null;
  liveAloneDate: string | null;
  authorUserId: number;
}

export default function PostAuthor({
  nickname,
  profileImage,
  liveAloneDate,
  authorUserId,
}: PostAuthorProps) {
  const currentUserId = useAuthStore((state) => state.user?.userId); // 로그인 유저
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 자취 기간 디데이 표시
  const days =
    liveAloneDate != null
      ? differenceInDays(new Date(), new Date(liveAloneDate))
      : null;

  // 글 작성자와 로그인 유저가 같은 지 확인
  const isMine = currentUserId === authorUserId;

  // 팔로잉 여부 확인
  useEffect(() => {
    const fetch = async () => {
      if (!currentUserId || isMine) return;

      const followings = await fetchFollowings(currentUserId); // 리스트 전체
      console.log("✅ followings 리스트:", followings);
      const isFollowing = followings.some(
        (user) => user.userId === authorUserId,
      );
      console.log("✅ 현재 팔로우 여부:", isFollowing);
      setIsFollowing(isFollowing);
    };
    fetch();
  }, [currentUserId, authorUserId]);

  // 팔로우 버튼 토글
  const handleToggleFollow = async () => {
    try {
      setIsLoading(true);
      if (isFollowing) {
        await unfollowUser(authorUserId);
        setIsFollowing(false);
      } else {
        await followUser(authorUserId);
        setIsFollowing(true);
      }
    } catch (e) {
      console.error("팔로우 토글 실패", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between my-3 py-4 border-b border-gray200">
      <div className="flex items-center gap-4">
        <Image
          src={getProfileImageUrl(profileImage)}
          alt="프로필 이미지"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <span className="font-medium text-gray900">{nickname}</span>
        {days !== null && (
          <div className="text-sm text-gray-500">( D +{days} )</div>
        )}
      </div>

      {/* 팔로우 버튼 */}
      {!isMine && (
        <button
          onClick={handleToggleFollow}
          disabled={isLoading}
          className={`text-sm px-8 py-2 rounded-3xl ${
            isFollowing
              ? "bg-gray200 text-gray800"
              : "bg-violet300 text-gray900 hover:bg-opacity-70"
          }`}
        >
          {isLoading ? "처리 중..." : isFollowing ? "팔로잉" : "팔로우"}
        </button>
      )}
    </div>
  );
}
