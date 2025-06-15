"use client";

import { useEffect, useState } from "react";
import { fetchPlaceList } from "@/lib/api/map";
import { PlaceListResponse, PlaceInfo } from "@/types/map";
import PlaceCard from "@/components/map/PlaceCard";

export default function HotPlaceList() {
  const [places, setPlaces] = useState<PlaceInfo[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const data: PlaceListResponse = await fetchPlaceList(latitude, longitude, 10); // 10km 반경 (임시)
        if (!data || !data.placeInfos) return;

        const placeList = data.placeInfos;

        // 즐겨찾기 수 > 0인 핫플레이스 먼저 정렬
        const hotPlaces = placeList.filter((p) => p.favoriteCount > 0);
        const otherPlaces = placeList.filter((p) => p.favoriteCount === 0);

        // 핫플레이스 → 기본순으로 최대 5개 자르기
        const sorted = [...hotPlaces, ...otherPlaces].slice(0, 5);
        setPlaces(sorted);
      } catch (error) {
        console.error("핫플레이스 데이터를 불러오는 데 실패했습니다", error);
      }
    });
  }, []);

  return (
    <ul className="flex flex-col max-h-[280px] overflow-y-auto px-2">
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
  );
}
