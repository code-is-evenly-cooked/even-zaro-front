"use client";

import { useState } from "react";
import { CategoryType } from "@/types/map";
import { useHotPlace } from "@/hooks/useHotPlace";
import HotPlaceHeader from "./HotPlaceHeader";
import PlaceCard from "@/components/map/PlaceCard";
import FallbackMessage from "@/components/common/Fallback/FallbackMessage";

export default function HotPlaceList() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("All");
  const [sortType, setSortType] = useState<"favorite" | "distance" | "name">(
    "favorite",
  );
  const { places } = useHotPlace({
    category: activeCategory,
    sort: sortType,
    radiusKm: 10, // 주변 장소 조회 반경 입력
    maxResults: 20, // 주변 장소 조회 리스트 개수 입력
  });

  return (
    <div className="flex flex-col gap-2">
      {/* 카테고리 탭 + 정렬 드롭다운 */}
      <HotPlaceHeader
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortType={sortType}
        setSortType={setSortType}
      />

      {/* 장소 리스트*/}
      {places.length > 0 ? (
        <div className="flex flex-col min-w-[400px] h-[280px] overflow-y-auto px-2">
          {places.map((place) => (
            <div key={place.placeId} className="relative">
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
              {/* 거리 표시 km 단위 */}
              <div className="absolute top-5 right-4 text-xs text-gray-500">
                {place.distanceKm.toFixed(1)} km
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-w-[400px] h-[280px] justify-center items-center">
          <FallbackMessage message="근처에 장소가 없습니다." />
        </div>
      )}
    </div>
  );
}
