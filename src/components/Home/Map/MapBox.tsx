"use client";

import { useEffect, useRef } from "react";
import { clearMarkers, placeToMarkerFromZaro } from "@/utils/mapUtil";
import { useMapStore } from "@/stores/map/useMapStore";
import { useMapPlaceStore } from "@/stores/map/useMapPlaceStore";

export default function MapBox() {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRefsByZaro = useRef<kakao.maps.Marker[]>([]);
  const overlayRefsByZaro = useRef<kakao.maps.CustomOverlay[]>([]);
  const { map, setMap } = useMapStore();
  const { placeList } = useMapPlaceStore();

  // 현재 위치 중심 지도
  useEffect(() => {
    // 카카오 sdk 불러오기
    if (!window.kakao || !window.kakao.maps) return;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const container = mapRef.current;
      if (!container) return;

      const kakaoMap = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      });

      // 현재 위치 마커
      new window.kakao.maps.Marker({
        map: kakaoMap,
        position: new window.kakao.maps.LatLng(latitude, longitude),
      });

      // Zustand에 지도 객체 저장
      setMap(kakaoMap);
    });
  }, [setMap]);

  // placeList가 바뀔 때마다 마커 다시 그림
  useEffect(() => {
    if (!map) return;

    clearMarkers(markerRefsByZaro, overlayRefsByZaro); // 탭 변경 시 항상 마커 제거

    if (!placeList?.placeInfos?.length) return;

    placeToMarkerFromZaro(
      placeList,
      map,
      markerRefsByZaro,
      overlayRefsByZaro,
      () => {}, // 필요 시 마커 클릭 핸들러 추가
    );
  }, [placeList, map]);

  return (
    <div
      ref={mapRef}
      className="w-full lg:w-[600px] h-[400px] bg-gray200 rounded-2xl"
    />
  );
}
