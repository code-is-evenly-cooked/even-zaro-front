"use client";

import KakaoMap from "@/components/map/KakaoMap";
import SideMenu from "@/components/map/SideMenu";
import PlaceModal from "@/components/map/PlaceModal";
import PlaceUserMemos from "@/components/map/PlaceUserMemos";
import { useEffect, useState } from "react";
import { fetchPlaceDetail, fetchPlaceList } from "@/lib/api/map";
import { PlaceDetailResponse, PlaceListResponse } from "@/types/map";

const MapPage = () => {

  const [page, setPage] = useState(1);
  const [placeList, setPlaceList] = useState<PlaceListResponse | null>(null);
  const [placeId, setPlaceId] = useState();
  const [placeDetail, setPlaceDetail] = useState<PlaceDetailResponse | null>(null);


  useEffect(() => {
    const lat = 37.554722;
    const lng = 126.970833;
    const distanceKm = 5;

    (async () => {
      try {
        const data = await fetchPlaceList(lat, lng, distanceKm);
        setPlaceList(data);
        // setPage(2); // 장소 목록 가져온 뒤 페이지 전환
      } catch (error) {
        console.error("장소 목록을 불러오는 데 실패했습니다.", error);
      }
    })();
  }, []);


  useEffect(() => {
    if (placeId !== null) {
      (async () => {
        try {
          const data = await fetchPlaceDetail(3);
          setPlaceDetail(data);
          // setPage(2);
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

      <PlaceModal placeList={placeList}></PlaceModal>
      <PlaceUserMemos placeDetail={placeDetail} />
    </div>
  );
};

export default MapPage;
