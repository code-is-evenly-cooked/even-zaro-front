import Image from "next/image";
import { getProfileImageUrl } from "@/utils/image";
import React from "react";
import { PlaceDetailResponse } from "@/types/map";

interface BookmarkInfoProps {
  placeDetail : PlaceDetailResponse;
}

export function BookmarkInfo( {placeDetail}: BookmarkInfoProps ) {

  return(
    <ul className="flex -space-x-6">
      {placeDetail?.usersInfo.slice(0, 3).map((user, idx) => (
        <li
          className="flex items-center justify-center rounded-full w-11 h-11 border-2 border-gray200"
          key={idx}
        >
          <button>
            <Image
              src={getProfileImageUrl(user.profileImage)}
              alt="유저 이미지"
              className="rounded-full border-1 border-gray200 flex-shrink-0"
              width="40"
              height="40"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}