"use client";

import { useEffect, useRef } from "react";
import SideMenu from "./SideMenu";
import PlaceModal from "@/components/map/PlaceModal";
import PlaceUserMemos from "@/components/map/PlaceUserMemos";

// Kakao 객체를 전역 선언합니다.
declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: new (lat: number, lng: number) => void;
        Map: new (container: HTMLElement, options: { center: void, level: number }) => void;
        load: (callback: () => void) => void;
      };
    };
  }
}

export default function KakaoMap() {
  const KAKAO_MAP_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 카카오지도 api

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      if (!window.kakao || !window.kakao.maps) return;

      window.kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) return;

        // ✅ LatLng도 반드시 이 안에서 선언해야 안전
        const defaultCenter = new window.kakao.maps.LatLng(37.5665, 126.978);

        new window.kakao.maps.Map(container, {
          center: defaultCenter,
          level: 3,
        });
      });
    };
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <div ref={mapRef} className={`w-screen h-screen`}/>
      <SideMenu />
      <PlaceModal />
      <PlaceUserMemos />
    </>
  );
}
