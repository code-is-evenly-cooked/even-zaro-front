"use client";

import { useEffect, useState } from "react";
import { fetchPlaceList } from "@/lib/api/map";
import { PlaceListResponse, PlaceInfo } from "@/types/map";
import HotPlaceHeader from "./HotPlaceHeader";
import PlaceCard from "@/components/map/PlaceCard";
import { useMapStore } from "@/stores/mapStore";

export default function HotPlaceList() {
  const [places, setPlaces] = useState<PlaceInfo[]>([]);
  const [activeCategory, setActiveCategory] = useState<
    "All" | "Cafe" | "Food" | "Etc"
  >("All");
  const [sortType, setSortType] = useState<"favorite" | "name">("favorite");
  const { setPlaceList } = useMapStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const data: PlaceListResponse = await fetchPlaceList(
          latitude,
          longitude,
          10, // 반경 km
        );
        if (!data || !data.placeInfos) return;

        const filtered =
          activeCategory === "All"
            ? data.placeInfos
            : data.placeInfos.filter((p) => p.category === activeCategory);

        const hotPlaces = filtered.filter((p) => p.favoriteCount > 0);
        const otherPlaces = filtered.filter((p) => p.favoriteCount === 0);
        let sorted = [...hotPlaces, ...otherPlaces];

        if (sortType === "name") {
          sorted = sorted.sort((a, b) => a.name.localeCompare(b.name));
        }

        // 리스트 설정
        const sliced = sorted.slice(0, 20); // 리스트 장소 표시 개수
        setPlaces(sliced);
        setPlaceList({ placeInfos: sliced, totalCount: sliced.length });
      } catch (error) {
        console.error("핫플레이스 데이터를 불러오는 데 실패했습니다", error);
      }
    });
  }, [activeCategory, sortType, setPlaceList]);

  return (
    <div className="flex flex-col gap-2">
      {/* 탭 + 정렬 선택 */}
      <HotPlaceHeader
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sortType={sortType}
        setSortType={setSortType}
      />

      {/* 장소 리스트 */}
      <ul className="flex flex-col min-w-[400px] h-[280px] overflow-y-auto px-2">
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
          <div className="text-sm text-gray600 px-4 py-2">
            근처에 장소가 없습니다.
          </div>
        )}
      </ul>
    </div>
  );
}
