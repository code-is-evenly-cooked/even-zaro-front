import React from "react";
import { DefaultProfileIcon, MoreIcon, SampleProfile, StarIcon } from "@/components/common/Icons";
import UserMemoCard from "@/components/map/UserMemoCard";

export default function PlaceUserMemos() {
  const dummyData = {
    placeId : 1,
    placeName : "갓덴 스시 강남점",
    address : "서울의 어딘가 123",
    lat: 36.123,
    lng: 127.232,
    favoriteCount: 5,
    userInfo: [
      {
        userId : 1,
        profileImage : "/icons/defaultProfile.svg",
        nickname: "이브니",
        memo: "요기 맛없어요asdsadasdasdasdasasdasd1",
      },
      {
        userId : 2,
        profileImage : "/icons/sampleProfile.svg",
        nickname: "삼브니",
        memo: "요기 맛없어asdasdasdsalkdjaslkdjaslkdjalskj2",
      },
      {
        userId : 3,
        profileImage : "/icons/sampleProfile.svg",
        nickname: "사브니",
        memo: "요기 맛없어요3",
      },
      {
        userId : 4,
        profileImage : "/icons/sampleProfile.svg",
        nickname: "오브니",
        memo: "요기 맛없어요4",
      },
    ],
  };
  return (
    <div className="flex flex-col absolute left-[400px] -bottom-4 z-10 w-96 h-96 bg-white rounded-t-2xl shadow-lg overflow-hidden">
      <div className="relative w-full px-4 py-4">
        <div className="absolute top-4 right-4">
          <MoreIcon className="w-5 h-5 text-gray-500 mt-0.5" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2">
            <StarIcon className="flex self-start mt-0.5 w-5 h-5 text-gray-700" />

            <div className="flex flex-col justify-center">
              <span className="font-bold text-gray-900 text-lg leading-snug">
                {dummyData.placeName}
              </span>

              <span className="text-xs text-gray-500 leading-snug">
                {dummyData.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 justify-center pb-4">
        {dummyData.favoriteCount == 0 ? (
          <div className="text-xs">
            <span> 아무도 해당 장소를 즐겨찾기에 등록하지 않았습니다.</span>
          </div>
        ) : (
          <>
            <div className="flex -space-x-6">
              {dummyData.userInfo.slice(0,3).map((user, idx) => (
                <div className="flex items-center justify-center rounded-full w-10 h-10 border-2 border-gray200"
                  key={idx}>
                  <img className="rounded-full w-10 h-10 border-1 border-gray200 flex-shrink-0"
                    src={user.profileImage} alt="유저 이미지"/>
                </div>
              ))}
            </div>
            <div className="text-xs">
              <span className="font-bold">
                {dummyData.userInfo[0].nickname}
              </span>
              <span> 님 외 {dummyData.favoriteCount} 명이 즐겨찾기에 추가했습니다.</span>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col gap-3 px-4 py-4 overflow-y-auto">
        {dummyData.userInfo.map((user) => (
          <UserMemoCard
            key={user.userId}
            profileImage={user.profileImage}
            nickName={user.nickname}
            memo={user.memo}
          />
        ))}
      </div>
    </div>
  );
}
