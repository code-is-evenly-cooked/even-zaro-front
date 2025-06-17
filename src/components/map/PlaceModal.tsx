import React from "react";
import PlaceCard from "@/components/map/PlaceCard";
import { useMapStore } from "@/stores/map/useMapStore";
import FallbackMessage from "@/components/common/Fallback/FallbackMessage";
import { useMapPlaceStore } from "@/stores/map/useMapPlaceStore";

export default function PlaceModal() {
  const { placeList } = useMapPlaceStore();
  const { regionName } = useMapStore();

  return (
    <div className="flex flex-col absolute -bottom-4 left-0 z-10 w-96 h-96 bg-white rounded-t-2xl shadow-lg overflow-hidden">
      {/* 헤더 */}
      <div className="px-4 pt-4">
        <span className="text-2xl font-extrabold block text-gray900">
          {regionName}
        </span>
        <div className="flex justify-end">
          <span className="text-sm text-gray-400">즐겨찾기 많은 순</span>
        </div>
      </div>

      {/* 장소 카드 리스트 */}
      <ul className="flex flex-col gap-3 px-4 py-4 overflow-y-auto">
        {placeList && placeList.placeInfos.length > 0 ? (
          placeList.placeInfos.map((place) => (
            <PlaceCard
              key={place.placeId}
              placeId={place.placeId}
              category={place.category}
              lat={place.lat}
              lng={place.lng}
              placeName={place.name}
              address={place.address}
              favoriteCount={place.favoriteCount}
            />
          ))
        ) : (
          <FallbackMessage message="인근에 조회된 장소가 없습니다." />
        )}
      </ul>
    </div>
  );
}
