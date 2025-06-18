"use client";

import KakaoMap from "@/components/map/KakaoMap";
import SideMenu from "@/components/map/SideMenu";
import PlaceModal from "@/components/map/PlaceModal";
import PlaceUserMemos from "@/components/map/PlaceUserMemos";
import { PAGE } from "@/types/map";
import { UserGroupList } from "@/components/map/UserGroupList";
import { FavoriteAddModal } from "@/components/map/FavoriteAddModal";
import { GroupsFavoriteList } from "@/components/map/GroupsFavoriteList";
import { useMapPageStore } from "@/stores/map/useMapPageStore";
import { useMapFavoriteStore } from "@/stores/map/useMapFavoriteStore";

const MapPage = () => {
  const { favoriteAddModal } = useMapFavoriteStore();
  const { page } = useMapPageStore();

  return (
    <div className="w-full h-full">
      <KakaoMap />
      <SideMenu />

      <div className="flex flex-col absolute -bottom-4 left-0 z-10 w-96 h-96 bg-white rounded-t-2xl">
        {page === PAGE.PLACELIST && <PlaceModal />}
        {page === PAGE.PLACEDETAIL && <PlaceUserMemos />}
        {page === PAGE.USERGROUPLIST && <UserGroupList />}
        {page === PAGE.FAVORITELIST && <GroupsFavoriteList />}
      </div>



      {favoriteAddModal && <FavoriteAddModal />}
    </div>
  );
};

export default MapPage;
