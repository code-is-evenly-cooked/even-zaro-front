"use client";

import KakaoMap from "@/components/map/KakaoMap";
import SideMenu from "@/components/map/SideMenu";
import PlaceModal from "@/components/map/PlaceModal";
import PlaceUserMemos from "@/components/map/PlaceUserMemos";
import { PAGE } from "@/types/map";
import { UserGroupList } from "@/components/map/UserGroupList";
import { useMapStore } from "@/stores/mapStore";

const MapPage = () => {
  const { page, groupModal } = useMapStore((state) => state);

  return (
    <div>
      <KakaoMap />
      <SideMenu />

      {page === PAGE.PLACELIST && <PlaceModal />}
      {page === PAGE.PLACEDETAIL && <PlaceUserMemos />}

      {groupModal && <UserGroupList />}
    </div>
  );
};

export default MapPage;
