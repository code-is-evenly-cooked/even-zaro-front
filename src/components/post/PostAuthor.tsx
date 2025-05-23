"use client";

import { differenceInDays } from "date-fns";

interface PostAuthorProps {
  nickname: string;
  profileImageUrl: string | null;
  liveAloneDate: string | null;
}

export default function PostAuthor({
  nickname,
  profileImageUrl,
  liveAloneDate,
}: PostAuthorProps) {
  const defaultImage = "/icons/defaultProfile.svg";
  const imageUrl = profileImageUrl || defaultImage;

  // 자취 기간 디데이 표시
  const days =
  liveAloneDate != null
    ? differenceInDays(new Date(), new Date(liveAloneDate))
    : null;

  return (
    <div className="flex items-center justify-between my-3 py-3 border-b border-gray-600">
      <div className="flex items-center gap-3">
        <img
          src={imageUrl}
          alt="프로필"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium text-gray-800">{nickname}</span>
        {days !== null && (
            <div className="text-sm text-gray-500">( D +{days} )</div>
          )}
      </div>

      <button className="text-sm px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600">
        팔로우
      </button>
    </div>
  );
}
