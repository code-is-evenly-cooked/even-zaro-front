"use client";

import KakaoMap from "@/components/map/KakaoMap";
import SideMenu from "@/components/map/SideMenu";
import PlaceModal from "@/components/map/PlaceModal";
import PlaceUserMemos from "@/components/map/PlaceUserMemos";
import { PAGE } from "@/types/map";
import { UserGroupList } from "@/components/map/UserGroupList";
import { useMapStore } from "@/stores/mapStore";
import { FavoriteAddModal } from "@/components/map/FavoriteAddModal";

const MapPage = () => {
  const { page, favoriteAddModal } = useMapStore((state) => state);
  const { setFavoriteAddModal } = useMapStore();

  return (
    <div className="w-full h-full">
      <KakaoMap />
      <SideMenu />

      {page === PAGE.PLACELIST && <PlaceModal />}
      {page === PAGE.PLACEDETAIL && <PlaceUserMemos />}
      {page === PAGE.USERGROUPLIST && <UserGroupList />}

      {favoriteAddModal && <FavoriteAddModal /> }
      <button className="absolute left-10 bg-amber-500 w-40 h-15 z-50"
        onClick={() => setFavoriteAddModal(favoriteAddModal)}>
        테스트용 즐겨찾기 모달 추가 버튼
      </button>

    </div>
  );
};

export default MapPage;
