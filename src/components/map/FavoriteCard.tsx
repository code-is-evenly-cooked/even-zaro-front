import { FavoriteListResponse } from "@/types/map";
import { useMapStore } from "@/stores/map/mapStore";

interface FavoriteCardProps {
  favorite: FavoriteListResponse;
}

export function FavoriteCard({ favorite }: FavoriteCardProps) {
  const { map, myLocation, setMyLocation } = useMapStore();

  function onClickFavorite() {
    if (!map || !myLocation) return;
    const lat = favorite.lat;
    const lng = favorite.lng;

    const latlng = new kakao.maps.LatLng(Number(lat), Number(lng));
    setMyLocation({ lat, lng }); // 클릭 시 내 위치 이동
    map.setCenter(latlng);
  }

  return (
    <>
      <li
        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
        key={favorite.id}
        onClick={onClickFavorite}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-medium text-sm text-gray900">
              {favorite.placeName}
            </span>
            <span className="text-xs text-gray600">{favorite.address}</span>
            <span className="text-xs text-gray600 ">{favorite.memo}</span>

            <div className="text-xs text-gray-600"></div>
          </div>
        </div>
        {/*<button className="hover:bg-gray-200 rounded-full p-1">*/}
        {/*  <MoreVertical size={20} className="text-gray-400" />*/}
        {/*</button>*/}
      </li>
    </>
  );
}
