"use client";

import KakaoMap from "@/components/map/KakaoMap";
import SideMenu from "@/components/map/SideMenu";
import PlaceModal from "@/components/map/PlaceModal";
import PlaceUserMemos from "@/components/map/PlaceUserMemos";

const MapPage = () => {
  return (
    <div>
      <KakaoMap />
      <SideMenu />
      <PlaceModal />
      <PlaceUserMemos />
    </div>
  );
};

export default MapPage;
