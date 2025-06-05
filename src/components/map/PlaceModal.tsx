import React, { useEffect } from "react";
import PlaceCard from "@/components/map/PlaceCard";
import { PlaceListResponse } from "@/types/map";
import { fetchPlaceList } from "@/lib/api/map";
import { useMapStore } from "@/stores/mapStore";

export default function PlaceModal() {
  const placeList = useMapStore((state) => state.placeList);
  const { setPlaceList } = useMapStore();

  useEffect(() => {
    const lat = 37.554722;
    const lng = 126.97083;
    const distanceKm = 5;

    (async () => {
      try {
        const data: PlaceListResponse = await fetchPlaceList(
          lat,
          lng,
          distanceKm,
        );
        setPlaceList(data);
      } catch (error) {
        console.error("장소 목록을 불러오는 데 실패했습니다.", error);
      }
    })();
  }, []);

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
      <ul className="flex flex-col gap-3 px-4 py-4 overflow-y-auto">
        {placeList?.placeInfos.map((place) => (
          <PlaceCard
            key={place.placeId}
            placeId={place.placeId}
            category={place.category}
            placeName={place.name}
            address={place.address}
            favoriteCount={place.favoriteCount}
          />
        ))}
      </ul>
    </div>
  );
}
