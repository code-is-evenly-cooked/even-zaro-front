import { Cafe, Etc, Food, Market } from "@/components/common/Icons/category";
import { JSX } from "react";
import { useMapStore } from "@/stores/map/mapStore";
import { useMapPageStore } from "@/stores/map/useMapPageStore";

interface PlaceCardProps {
  placeId: number;
  placeName: string;
  address: string;
  category: string;
  lat: number;
  lng: number;
  favoriteCount: number;
  onClick?: () => void;
}

const categoryIcons: Record<string, JSX.Element> = {
  FD6: <Food />, // 식당
  CE7: <Cafe />, // 카페
  MT1: <Market />, // 마트
  CS2: <Market />, // 편의점
  Etc: <Etc />, // 그외
};

export default function PlaceCard({
  placeId,
  placeName,
  address,
  category,
  lat,
  lng,
  favoriteCount,
}: PlaceCardProps) {
  const { map } = useMapStore();
  const { setPagePlaceDetail } = useMapPageStore();

  function onClickPlace() {
    setPagePlaceDetail(placeId);

    // 지도 중심 이동
    if (map) {
      const latlng = new window.kakao.maps.LatLng(lat, lng);
      map.setCenter(latlng);
    }
  }

  return (
    <li
      className="flex items-center hover:bg-gray-100 transition p-1 cursor-pointer"
      onClick={onClickPlace}
      key={placeId}
    >
      <div className="flex w-14 h-14 items-center justify-center mr-4 border border-gray-300 rounded-full">
        {categoryIcons[category] || <Etc />}
      </div>
      <div className="flex-1 p-3 shadow-sm ">
        <h3 className="font-bold text-base ">{placeName}</h3>
        <p className="text-sm text-gray600">{address}</p>
        <p className="text-sm text-gray-400">즐겨찾기 {favoriteCount}개</p>
      </div>
    </li>
  );
}
