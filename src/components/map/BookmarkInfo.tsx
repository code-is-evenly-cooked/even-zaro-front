import Image from "next/image";
import { getProfileImageUrl } from "@/utils/image";
import React from "react";
import { PlaceDetailResponse } from "@/types/map";
import Link from "next/link";

interface BookmarkInfoProps {
  placeDetail: PlaceDetailResponse;
}

export function BookmarkInfo({ placeDetail }: BookmarkInfoProps) {
  return (
    <div className="flex items-center space-x-2 justify-center pb-4">
      {placeDetail?.favoriteCount == 0 ? (
        <div className="text-xs">
          <span> 아무도 해당 장소를 즐겨찾기에 등록하지 않았습니다.</span>
        </div>
      ) : (
        <>
          <ul className="flex -space-x-6">
            {placeDetail?.usersInfo.slice(0, 3).map((user, idx) => (
              <li
                className="flex items-center justify-center rounded-full w-11 h-11 border-2 border-gray200"
                key={idx}
              >
                  <Link
                    href={`/profile/${user.userId}`}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src={getProfileImageUrl(user.profileImage)}
                      alt="프로필 이미지"
                      width={40}
                      height={40}
                      className="rounded-full border border-gray200 flex-shrink-0 h-auto"
                    />
                  </Link>
              </li>
            ))}
          </ul>
          <div className="text-xs">
            <button className="font-bold">
              {placeDetail?.usersInfo[0].nickname}
            </button>
            <span>
              {" "}
              님 외 <strong>{placeDetail?.favoriteCount - 1}</strong> 명이
              즐겨찾기에 추가했습니다.
            </span>
          </div>
        </>
      )}
    </div>
  );
}
