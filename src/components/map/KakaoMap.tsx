"use client";

import { useEffect, useRef } from "react";
import {
  addMarkers,
  initializeMap,
  loadKakaoMapSdk,
  moveMyLocation, placeToMarker,
  updateCenterAddress,
} from "@/utils/mapUtil";
import { useMapStore } from "@/stores/mapStore";

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { placeList } = useMapStore((state) => state);
  const { setMyLocation, setRegionName } = useMapStore();

  useEffect(() => {
    loadKakaoMapSdk(() => {
      if (!mapRef.current) return;
      initializeMap(mapRef.current, (map) => {
        addMarkers(map); // 마커 추가 테스트
        moveMyLocation(map, setMyLocation); // 내 위치 추적하여 전역상태변수에 위도경도 저장
        updateCenterAddress(map, setRegionName); // 지도 중심 주소 업데이트 및 내 위치 행정동 저장
        placeToMarker(placeList!, map);
      });
    });
  }, []);

  return (
    <>
      <div ref={mapRef} className="absolute w-screen h-screen left-0" />
    </>
  );
}
