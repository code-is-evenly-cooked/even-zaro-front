import React from "react";
import PlaceCard from "@/components/map/PlaceCard";
import { PlaceListResponse } from "@/types/map";


interface PlaceModalProps {
  placeList : PlaceListResponse;
}

export default function PlaceModal( { placeList } : PlaceModalProps ) {

  return (
    <div className="flex flex-col absolute -bottom-4 left-4 z-10 w-96 h-96 bg-white rounded-t-2xl shadow-lg overflow-hidden">
      {/* 헤더 */}
      <div className="px-4 pt-4">
        <span className="text-2xl font-extrabold block text-gray900">
          서울시 &gt; 강남구
        </span>
        <div className="flex justify-end">
          <span className="text-sm text-gray-400">즐겨찾기 많은 순</span>
        </div>
      </div>

      {/* 장소 카드 리스트 */}
      <div className="flex flex-col gap-3 px-4 py-4 overflow-y-auto">
        {placeList?.placeInfos.map((place) => (
          <PlaceCard
            key={place.place_id}
            category={place.category}
            placeName={place.placeName}
            address={place.address}
            favoriteCount={place.favoriteCount}
          />
        ))}
      </div>
    </div>
  );
}
