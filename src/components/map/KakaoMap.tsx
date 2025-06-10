"use client";

import { useEffect, useRef } from "react";
import { initializeMap, loadKakaoMapSdk } from "@/utils/mapUtil";

// Kakao 객체를 전역 선언합니다.
// declare global {
//   interface Window {
//     kakao: {
//       maps: {
//         LatLng: new (lat: number, lng: number) => void;
//         Map: new (
//           container: HTMLElement,
//           options: { center: void; level: number },
//         ) => void;
//         load: (callback: () => void) => void;
//       };
//     };
//   }
// }
declare global {
  interface Window {
    kakao: any; // kakao.maps.* 전부 포괄
  }
}

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
// function placesSearchCB(data, status, pagination) {
//   if (status === kakao.maps.services.Status.OK) {
//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//     // LatLngBounds 객체에 좌표를 추가합니다
//     const bounds = new kakao.maps.LatLngBounds();
//
//     for (let i = 0; i < data.length; i++) {
//       displayMarker(data[i]);
//       bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
//     }
//
//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//     map.setBounds(bounds);
//   }
// }

// 지도에 마커를 표시하는 함수입니다
// function displayMarker(place) {
//   // 마커를 생성하고 지도에 표시합니다
//   const marker = new kakao.maps.Marker({
//     map: map,
//     position: new kakao.maps.LatLng(place.y, place.x),
//   });
//
//   // 마커에 클릭이벤트를 등록합니다
//   kakao.maps.event.addListener(marker, "click", function () {
//     // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
//     infowindow.setContent(
//       '<div style="padding:5px;font-size:12px;height:50px;">' +
//         place.place_name +
//         "placeId: " +
//         place.id +
//         "</div>",
//     );
//     infowindow.open(map, marker);
//   });
// }

// function createMap() {
//   const KAKAO_MAP_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID; // 카카오지도 api
//
//   const mapRef = useRef<HTMLDivElement>(null);
//   const script = document.createElement("script");
//   script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
//   script.async = true;
//
//   script.onload = () => {
//     if (!window.kakao || !window.kakao.maps) return;
//
//     const kakao = window.kakao;
//
//     window.kakao.maps.load(() => {
//       const container = mapRef.current;
//       if (!container) return;
//
//       // 내 위치 기준으로 지도를 불러옴
//       navigator.geolocation.getCurrentPosition((position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         const userLocation = new window.kakao.maps.LatLng(lat, lng);
//
//         const map = new window.kakao.maps.Map(container, {
//           center: userLocation,
//           level: 3,
//         });
//
//         // 장소 검색 객체를 생성합니다
//         // const ps = new kakao.maps.services.Places();
//
//         // 키워드로 장소를 검색합니다
//         // ps.keywordSearch("동현피트니스", placesSearchCB);
//       });
//       document.head.appendChild(script);
//     });
//   };
//   return mapRef;
// }



export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadKakaoMapSdk(() => {
      if (mapRef.current) {
        initializeMap(mapRef.current);
      }
    });
  }, []);

  return <div ref={mapRef} className="absolute w-screen h-screen left-0" />;
}
