"use client";

import KakaoMap from "@/components/map/KakaoMap";
import SideMenu from "@/components/map/SideMenu";
import PlaceModal from "@/components/map/PlaceModal";
import PlaceUserMemos from "@/components/map/PlaceUserMemos";
import { useEffect, useState } from "react";
import { fetchPlaceDetail, fetchPlaceList } from "@/lib/api/map";
import { PAGE, PageType, PlaceDetailResponse, PlaceListResponse } from "@/types/map";

const MapPage = () => {

  const [page, setPage] = useState<PageType>(PAGE.PLACELIST);
  const [placeList, setPlaceList] = useState<PlaceListResponse | null>(null);
  const [placeId, setPlaceId] = useState<number | null>(null);
  const [placeDetail, setPlaceDetail] = useState<PlaceDetailResponse | null>(
    null,
  );

  function handleClick(placeId: number) {
    setPlaceId(placeId);
    setPage(PAGE.PLACEDETAIL);
  }

  function backPage() {
    setPage(PAGE.PLACELIST);
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
        <PlaceModal onClick={handleClick} placeList={placeList}></PlaceModal>
      )}
      {page == PAGE.PLACEDETAIL && placeDetail && (
        <PlaceUserMemos backPage={backPage} placeDetail={placeDetail} />
      )}
    </div>
  );
};

export default MapPage;
