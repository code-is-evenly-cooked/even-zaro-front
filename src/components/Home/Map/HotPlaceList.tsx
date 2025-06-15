"use client";

import { useEffect, useState } from "react";
import { fetchPlaceList } from "@/lib/api/map";
import { PlaceListResponse, PlaceInfo } from "@/types/map";
import PlaceCard from "@/components/map/PlaceCard";

export default function HotPlaceList() {
  const [places, setPlaces] = useState<PlaceInfo[]>([]);
  const [activeCategory, setActiveCategory] = useState<"MT1" | "Food" | "Etc">("MT1");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const data: PlaceListResponse = await fetchPlaceList(latitude, longitude, 10);
        if (!data || !data.placeInfos) return;

        const filtered = data.placeInfos.filter((p) => p.category === activeCategory);
        const hotPlaces = filtered.filter((p) => p.favoriteCount > 0);
        const otherPlaces = filtered.filter((p) => p.favoriteCount === 0);

        const sorted = [...hotPlaces, ...otherPlaces].slice(0, 5);
        setPlaces(sorted);
      } catch (error) {
        console.error("핫플레이스 데이터를 불러오는 데 실패했습니다", error);
      }
    });
  }, [activeCategory]);

  return (
    <div className="flex flex-col gap-2">
      {/* 카테고리 탭 */}
      <div className="flex gap-2 px-2">
        {[
          { label: "카페", value: "MT1" },
          { label: "음식점", value: "Food" },
          { label: "기타", value: "Etc" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveCategory(tab.value as "MT1" | "Food" | "Etc")}
            className={`px-3 py-1 rounded-full border text-sm ${
              activeCategory === tab.value ? "bg-violet800 text-white" : "bg-white text-gray700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 장소 리스트 */}
      <ul className="flex flex-col min-w-[400px] max-h-[280px] overflow-y-auto px-2">
        {places.map((place) => (
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
        ))}
        {places.length === 0 && (
          <div className="text-sm text-gray-400 px-4 py-2">근처에 장소가 없습니다.</div>
        )}
      </ul>
    </div>
  );
}
