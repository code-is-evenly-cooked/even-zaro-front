"use client";

import { useEffect, useRef } from "react";
import { addMarkers, initializeMap, loadKakaoMapSdk } from "@/utils/mapUtil";

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    loadKakaoMapSdk(() => {
      if (!mapRef.current) return;
      initializeMap(mapRef.current, (map) => {
        addMarkers(map); // ✅ 외부 함수 호출만으로 마커 표시
      });
    });
  }, []);

  return <div ref={mapRef} className="absolute w-screen h-screen left-0" />;
}
