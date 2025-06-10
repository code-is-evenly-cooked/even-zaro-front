"use client";

import { useEffect, useRef, useState } from "react";
import {
  addMarkers, enableClickToShowAddress,
  initializeMap,
  loadKakaoMapSdk,
  moveMyLocation, updateCenterAddress,
} from "@/utils/mapUtil";
import { useMapStore } from "@/stores/mapStore"; // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const myLocation = useMapStore((state) => state.myLocation);
  const { setMyLocation } = useMapStore();
  const [centerAddr, setCenterAddr] = useState("");

  useEffect(() => {
    loadKakaoMapSdk(() => {
      if (!mapRef.current) return;
      initializeMap(mapRef.current, (map) => {
        addMarkers(map); // 마커 추가 테스트
        moveMyLocation(map, setMyLocation); // 내 위치 추적하여 전역상태변수에 위도경도 저장
        updateCenterAddress(map, setCenterAddr); // 지도 중심 주소 업데이트
        enableClickToShowAddress(map);           // 클릭 시 주소 표시
      });
    });
  }, []);

  useEffect(() => {
    console.log("전역상태 myLocation :", myLocation);
  }, [myLocation]);

  return (
    <>
      <div ref={mapRef} className="absolute w-screen h-screen left-0" />
      <div
        id="centerAddr"
        className="absolute top-2 left-2 bg-white text-sm px-3 py-1 rounded shadow z-50 left-40 top-40"
      >야호야홍
        {centerAddr || "중심 좌표의 주소를 불러오는 중..."}
      </div>
    </>
  );
}
