"use client";

import KakaoMap from "@/components/map/KakaoMap";
import SideMenu from "@/components/map/SideMenu";
import PlaceModal from "@/components/map/PlaceModal";
import PlaceUserMemos from "@/components/map/PlaceUserMemos";
import { PAGE } from "@/types/map";
import { UserGroupList } from "@/components/map/UserGroupList";
import { useMapStore } from "@/stores/mapStore";
import { FavoriteAddModal } from "@/components/map/FavoriteAddModal";
import { GroupsFavoriteList } from "@/components/map/GroupsFavoriteList";

const MapPage = () => {
  const { page, favoriteAddModal } = useMapStore((state) => state);

  return (
    <div className="w-full h-full">
      <KakaoMap />
      <SideMenu />

      {page === PAGE.PLACELIST && <PlaceModal />}
      {page === PAGE.PLACEDETAIL && <PlaceUserMemos />}
      {page === PAGE.USERGROUPLIST && <UserGroupList />}
      {page === PAGE.FAVORITELIST && <GroupsFavoriteList />}

      {favoriteAddModal && <FavoriteAddModal /> }
    </div>
  );
};

export default MapPage;
