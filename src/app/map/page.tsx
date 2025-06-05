"use client";

import KakaoMap from "@/components/map/KakaoMap";
import SideMenu from "@/components/map/SideMenu";
import PlaceModal from "@/components/map/PlaceModal";
import PlaceUserMemos from "@/components/map/PlaceUserMemos";
import { useEffect, useState } from "react";
import { fetchPlaceDetail, fetchPlaceList } from "@/lib/api/map";
import { PAGE, PlaceDetailResponse, PlaceListResponse } from "@/types/map";
import { UserGroupList } from "@/components/map/UserGroupList";
import { useMapStore } from "@/stores/mapStore";

const MapPage = () => {
  const { page, placeId, placeList } = useMapStore((state) => state);
  const { setPlaceList } = useMapStore();

  const [placeDetail, setPlaceDetail] = useState<PlaceDetailResponse | null>(
    null,
  );
  const [groupModal, setGroupModal] = useState(false);

  function handleClickGroupList() {
    setGroupModal((prev) => !prev);
  }

  useEffect(() => {
    const lat = 37.554722;
    const lng = 126.97083;
    const distanceKm = 5;

    (async () => {
      try {
        const data: PlaceListResponse = await fetchPlaceList(
          lat,
          lng,
          distanceKm,
        );
        setPlaceList(data);
      } catch (error) {
        console.error("장소 목록을 불러오는 데 실패했습니다.", error);
      }
    })();
  }, []);

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
        <PlaceModal placeList={placeList}></PlaceModal>
      )}
      {page == PAGE.PLACEDETAIL && placeDetail && (
        <PlaceUserMemos
          openGroupList={handleClickGroupList}
          placeDetail={placeDetail}
        />
      )}

      {groupModal && <UserGroupList />}
    </div>
  );
};

export default MapPage;
