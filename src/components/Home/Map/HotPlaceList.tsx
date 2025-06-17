"use client";

import { useEffect, useState } from "react";
import { fetchPlaceList } from "@/lib/api/map";
import { PlaceListResponse, PlaceInfo, Category } from "@/types/map";
import HotPlaceHeader from "./HotPlaceHeader";
import PlaceCard from "@/components/map/PlaceCard";
import FallbackMessage from "@/components/common/Fallback/FallbackMessage";
import { getDistanceFromLatLonInKm } from "@/utils/mapUtil";
import { useMapPlaceStore } from "@/stores/map/useMapPlaceStore";

type PlaceWithDistance = PlaceInfo & { distanceKm: number };

export default function HotPlaceList() {
  const [places, setPlaces] = useState<PlaceWithDistance[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sortType, setSortType] = useState<"favorite" | "distance" | "name">(
    "favorite",
  );
  const { setPlaceList } = useMapPlaceStore();

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

        // ✨ 여기가 핵심
        const knownCategories: Category[] = ["FD6", "CE7", "CS2", "MT1"];
        const filtered =
          activeCategory === "All"
            ? data.placeInfos
            : activeCategory === "Etc"
              ? data.placeInfos.filter(
                (p) => !knownCategories.includes(p.category as Category),
              )
              : data.placeInfos.filter((p) => p.category === activeCategory);

        const hotPlaces = filtered.filter((p) => p.favoriteCount > 0);
        const otherPlaces = filtered.filter((p) => p.favoriteCount === 0);
        const sorted = [...hotPlaces, ...otherPlaces];

        const withDistance: PlaceWithDistance[] = sorted.map((place) => ({
          ...place,
          distanceKm: getDistanceFromLatLonInKm(
            latitude,
            longitude,
            place.lat,
            place.lng,
          ),
        }));

        // 정렬
        if (sortType === "distance") {
          withDistance.sort((a, b) => a.distanceKm - b.distanceKm);
        } else if (sortType === "name") {
          withDistance.sort((a, b) => a.name.localeCompare(b.name));
        }

        // 리스트 설정
        const sliced = withDistance.slice(0, 20); // 리스트 장소 표시 개수
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

      {/* 장소 리스트*/}
      {places.length > 0 ? (
        <ul className="flex flex-col min-w-[400px] h-[280px] overflow-y-auto px-2">
          {places.map((place) => (
            <li key={place.placeId} className="relative">
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
            </li>
          ))}
        </ul>
      ) : (
        <li className="flex min-w-[400px] h-[280px] justify-center items-center">
          <FallbackMessage message="근처에 장소가 없습니다." />
        </li>
      )}
    </div>
  );
}
