import { ArrowLeftIcon, LucideStar, MoreVerticalIcon } from "lucide-react";
import React, { useState } from "react";
import { PlaceDetailResponse } from "@/types/map";
import { useMapStore } from "@/stores/mapStore";

interface PlaceUserMemosHeaderProps {
  placeDetail: PlaceDetailResponse;
}

export default function PlaceUserMemosHeader({
  placeDetail,
}: PlaceUserMemosHeaderProps) {
  const { setPagePlaceList } = useMapStore();

  const [favorite, setFavorite] = useState(false);

  function handleClickFavorite() {
    setFavorite((prev) => !prev);
  }

  return (
    <div className="relative w-full px-4 py-4">
      <div className="flex flex-col items-center justify-center">
        <button className="absolute left-4 top-4" onClick={setPagePlaceList}>
          <ArrowLeftIcon />
        </button>

        <div className="flex items-center space-x-2">
          <button onClick={handleClickFavorite} className="flex self-start">
            <LucideStar
              className={favorite ? " " : "text-yellow-400 fill-yellow-400"}
            />
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
  );
}
