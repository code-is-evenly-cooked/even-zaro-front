"use client";

import KakaoMap from "@/components/map/KakaoMap";
import SideMenu from "@/components/map/SideMenu";
import PlaceModal from "@/components/map/PlaceModal";
import PlaceUserMemos from "@/components/map/PlaceUserMemos";
import { useEffect } from "react";
import { fetchPlaceDetail } from "@/lib/api/map";
import { PAGE } from "@/types/map";
import { UserGroupList } from "@/components/map/UserGroupList";
import { useMapStore } from "@/stores/mapStore";

const MapPage = () => {
  const { page, placeId, placeList, placeDetail, groupModal } = useMapStore((state) => state);
  const { setPlaceDetail } = useMapStore();



  useEffect(() => {
    if (placeId !== null) {
      (async () => {
        try {
          const data = await fetchPlaceDetail(placeId);
          setPlaceDetail(data);
        } catch (error) {
          console.error("장소 상세 정보를 불러오는 데 실패했습니다.", error);
        }
      })();
    }
  }, [placeId]);

  return (
    <div>
      <KakaoMap />
      <SideMenu />

      {page === PAGE.PLACELIST && placeList && (
        <PlaceModal />
      )}
      {page == PAGE.PLACEDETAIL && placeDetail && (
        <PlaceUserMemos
          placeDetail={placeDetail}
        />
      )}

      {groupModal && <UserGroupList />}
    </div>
  );
};

export default MapPage;
