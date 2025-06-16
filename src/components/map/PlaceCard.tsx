import {
  Cafe,
  Etc,
  Favorite,
  Food,
  Market,
} from "@/components/common/Icons/category";
import { JSX } from "react";
import { useMapStore } from "@/stores/mapStore";

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
  Food: <Food />,
  Cafe: <Cafe />,
  Market: <Market />,
  Etc: <Etc />,
  Favorite: <Favorite />,
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
  const { setPagePlaceDetail, map } = useMapStore();

  function onClickPlace () {
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
      {/* 이미지 영역 */}
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
