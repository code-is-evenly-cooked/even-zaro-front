"use client";

import { useEffect, useState } from "react";
import { fetchPlaceList } from "@/lib/api/map";
import { PlaceListResponse } from "@/types/map";
import PlaceCard from "@/components/map/PlaceCard";

export default function HotPlaceList() {
  const [places, setPlaces] = useState<PlaceListResponse | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const data = await fetchPlaceList(latitude, longitude, 3); // 반경 3km
        setPlaces(data);
      } catch (error) {
        console.error("핫플레이스 데이터를 불러오는 데 실패했습니다", error);
      }
    });
  }, []);

  return (
    <ul className="flex flex-col gap-3 max-h-[360px] overflow-y-auto px-2">
      {places?.placeInfos.map((place) => (
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
    </ul>
  );
}
