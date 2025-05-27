"use client";

import { useEffect, useRef, useState } from "react";
import SideMenu from "./SideMenu";

// Kakao 객체를 전역 선언합니다.
declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const KAKAO_MAP_API_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY; // 카카오지도 api

  const mapRef = useRef<HTMLDivElement>(null);
  const [placeList, setPlaceList] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"FD6" | "CE7">("FD6");
  const [sortType, setSortType] = useState<"distance" | "name">("distance");
  const [userCoords, setUserCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchInput, setSearchInput] = useState(""); // 입력창 상태
  const [currentAddress, setCurrentAddress] = useState(""); // 주소 표시 상태

  useEffect(() => {
    const script = document.createElement("script");
    // 여기에 카카오 sdk appkey 본인 꺼 집어넣으시면 됩니다
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
    script.async = true;

    script.onload = () => {
      if (!window.kakao || !window.kakao.maps) return;

      window.kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) return;

        // ✅ LatLng도 반드시 이 안에서 선언해야 안전
        const defaultCenter = new window.kakao.maps.LatLng(37.5665, 126.978);

        const map = new window.kakao.maps.Map(container, {
          center: defaultCenter,
          level: 3,
        });

        const geocoder = new window.kakao.maps.services.Geocoder();

        // 장소 렌더링 함수 정의
        const renderPlaces = (lat: number, lng: number) => {
          const center = new window.kakao.maps.LatLng(lat, lng);
          map.setCenter(center);
          setUserCoords({ lat, lng });

          // 현재 위치에 마커 및 원 표시
          new window.kakao.maps.Marker({ position: center, map });
          new window.kakao.maps.Circle({
            map,
            center,
            radius: 500, // 반경
            strokeWeight: 2, // 테두리 선 굵기
            strokeColor: "#00aaff", // 테두리 선 색상
            strokeOpacity: 0.8, // 테두리 선 투명도
            fillColor: "#cceeff", // 원 색칠 색상
            fillOpacity: 0.2, // 원 색칠 투명도
          });

          // 여기서 좌표를 주소로 변환
          geocoder.coord2Address(lng, lat, (result: any, status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0]?.address?.address_name;
              setCurrentAddress(address || "");
            }
          });

          const ps = new window.kakao.maps.services.Places();
          const allPlaces: any[] = [];

          // 음식점 필터 검색
          ps.categorySearch(
            "FD6",
            (data1, status1) => {
              if (status1 === window.kakao.maps.services.Status.OK) {
                data1.forEach((place) => (place.category_group_code = "FD6"));
                allPlaces.push(...data1);
                // 카페 필터 검색
                ps.categorySearch(
                  "CE7",
                  (data2, status2) => {
                    if (status2 === window.kakao.maps.services.Status.OK) {
                      data2.forEach(
                        (place) => (place.category_group_code = "CE7"),
                      );
                      allPlaces.push(...data2);

                      const uniquePlaces = allPlaces.filter(
                        (place, index, self) =>
                          index === self.findIndex((p) => p.id === place.id),
                      );

                      setPlaceList(uniquePlaces);

                      // 마커 생성과 클릭 시 장소 정보 창
                      uniquePlaces.forEach((place) => {
                        const position = new window.kakao.maps.LatLng(
                          place.y,
                          place.x,
                        );
                        // 마커 이미지를 필터 별로 적용할 수 있음
                        const markerImageSrc =
                          place.category_group_code === "FD6"
                            ? "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"
                            : "http://t1.daumcdn.net/mapjsapi/images/marker.png";
                        const markerImage = new window.kakao.maps.MarkerImage(
                          markerImageSrc,
                          new window.kakao.maps.Size(24, 35),
                        );

                        const marker = new window.kakao.maps.Marker({
                          map,
                          position,
                          image: markerImage,
                        });

                        // 정보 창 디자인은 여기서 수정
                        const infowindow = new window.kakao.maps.InfoWindow({
                          content: `
                            <div style="padding:8px 12px; font-size:13px; max-width:200px;">
                            <strong style="font-size:14px;">${place.place_name}</strong><br />
                            <span>${place.road_address_name || place.address_name}</span><br />
                            <span style="color:gray;">${place.phone || "전화번호 없음"}</span><br />
                            <span style="float:right;">x</span>
                            </div>
                          `,
                        });

                        window.kakao.maps.event.addListener(
                          marker,
                          "click",
                          () => {
                            infowindow.open(map, marker);
                          },
                        );
                      });
                    }
                  },
                  { location: center, radius: 500 },
                );
              }
            },
            { location: center, radius: 500 },
          );
        };

        // 위치 접근 허용하면 내 위치에서 초기 렌더링
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              renderPlaces(position.coords.latitude, position.coords.longitude);
            },
            (error) => console.warn("위치 정보를 가져올 수 없습니다.", error),
          );
        }

        // 검색 기능
        const handleSearch = () => {
          if (!searchInput.trim()) return;
          geocoder.addressSearch(searchInput, (result: any, status: string) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const { y, x } = result[0];
              renderPlaces(parseFloat(y), parseFloat(x));
            } else {
              alert("검색 결과를 찾을 수 없습니다.");
            }
          });
        };

        (window as any).handleSearch = handleSearch;
      });
    };
    document.head.appendChild(script);
  }, [searchInput]);

  return (
    <>
      {/* <div ref={mapRef} className="w-[500px] h-[400px] bg-gray-100" /> */}
      <div ref={mapRef} className="w-screen h-screen bg-gray-100" />
      <SideMenu />
    </>
  );
}
