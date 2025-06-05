import React, { useState } from "react";
import UserMemoCard from "@/components/map/UserMemoCard";
import { ArrowLeftIcon, LucideStar, MoreVerticalIcon } from "lucide-react";
import { PlaceDetailResponse } from "@/types/map";
import Image from "next/image";
import { getProfileImageUrl } from "@/utils/image";

interface PlaceUserMemosProps {
  placeDetail: PlaceDetailResponse;
  backPage: () => void;
}

export default function PlaceUserMemos({ placeDetail, backPage }: PlaceUserMemosProps) {
  const [favorite, setFavorite] = useState(false);

  function handleClickFavorite() {
    setFavorite((prev) => !prev);
  }

  return (
    <div className="flex flex-col absolute -bottom-4 left-4 z-10 w-96 h-96 bg-white rounded-t-2xl shadow-lg overflow-hidden">
      <div className="relative w-full px-4 py-4">


        <div className="flex flex-col items-center justify-center">
          <button className="absolute left-4 top-4"
            onClick={backPage}>
            <ArrowLeftIcon />
          </button>

          <div className="flex items-center space-x-2">
            <button onClick={handleClickFavorite} className="flex self-start">
              <LucideStar className={favorite ? " " : "text-yellow-400 fill-yellow-400"} />
            </button>

            <div className="flex flex-col justify-center items-center text-center max-w-[200px]">
              <span className="font-bold text-gray900 text-lg leading-snug break-words">
                {placeDetail?.placeName}
              </span>
              <span className="text-xs text-gray600 leading-snug break-words">
                {placeDetail?.address}
              </span>
            </div>
            <button className="absolute top-4 right-4 w-5 h-5 mt-0.5">
              <MoreVerticalIcon />
            </button>
          </div>
        </div>
      </div>

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
                  className="flex items-center justify-center rounded-full w-10 h-10 border-2 border-gray200"
                  key={idx}
                >
                  <button>
                    <Image
                      src={getProfileImageUrl(user.profileImage)}
                      alt="유저 이미지"
                      className="rounded-full w-10 h-10 border-1 border-gray200 flex-shrink-0"
                      width="28"
                      height="28"
                    />
                  </button>
                </li>
              ))}
            </ul>
            <div className="text-xs">
              <button className="font-bold">
                {placeDetail?.usersInfo[0].nickname}
              </button>
              <span>
                {" "}
                님 외 {placeDetail?.favoriteCount} 명이 즐겨찾기에 추가했습니다.
              </span>
            </div>
          </>
        )}
      </div>
      <ul className="flex flex-col gap-3 px-4 py-4 overflow-y-auto">
        {placeDetail?.usersInfo.map((user) => (
          <UserMemoCard
            key={user.userId}
            profileImage={user.profileImage}
            nickName={user.nickname}
            memo={user.memo}
          />
        ))}
      </ul>
    </div>
  );
}
