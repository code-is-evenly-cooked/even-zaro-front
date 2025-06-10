"use client";

import { useEffect, useRef } from "react";
import { addMarkers, initializeMap, loadKakaoMapSdk, moveMyLocation } from "@/utils/mapUtil";
import { useMapStore } from "@/stores/mapStore";

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const myLocation = useMapStore((state) => state.myLocation);
  const { setMyLocation } = useMapStore();


  useEffect(() => {
    loadKakaoMapSdk(() => {
      if (!mapRef.current) return;
      initializeMap(mapRef.current, (map) => {
        addMarkers(map); // 마커 추가 테스트
        moveMyLocation(map, setMyLocation); // 내 위치 추적하여 전역상태변수에 위도경도 저장
      });
    });
  }, []);


  useEffect(() => {
    console.log("전역상태 myLocation :", myLocation);
  }, [myLocation]);


  return (
    <>
      <div ref={mapRef} className="absolute w-screen h-screen left-0" />
    </>
  );
}
