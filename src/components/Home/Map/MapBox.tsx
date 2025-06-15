"use client";

import { useEffect, useRef } from "react";
import { loadKakaoMapSdk } from "@/utils/mapUtil";

export default function MapBox() {
  const mapRef = useRef<HTMLDivElement>(null);

  // 현재 위치 중심 지도
  useEffect(() => {
    loadKakaoMapSdk(() => {  // 카카오 sdk 불러오기
      if (!window.kakao || !window.kakao.maps) return;

      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const container = mapRef.current;
        if (!container) return;

        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        });

        new window.kakao.maps.Marker({
          map,
          position: new window.kakao.maps.LatLng(latitude, longitude),
        });
      });
    });
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full md:w-[600px] h-[400px] bg-gray200 rounded-2xl"
    />
  );
}
