import UserMemoCard from "@/components/map/UserMemoCard";
import React from "react";
import { PlaceDetailResponse } from "@/types/map";

interface UserMemoCardsProps {
  placeDetail: PlaceDetailResponse;
}

export function UserMemoCards({ placeDetail }: UserMemoCardsProps) {
  return (
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
  );
}
