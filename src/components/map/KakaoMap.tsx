"use client";

import { useEffect, useRef, useState } from "react";
import {
  initializeMap,
  loadKakaoMapSdk,
  moveMyLocation,
  placeToMarker,
  searchKeyword,
  updateCenterAddress,
} from "@/utils/mapUtil";
import { useMapStore } from "@/stores/mapStore";

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { placeList, myLocation } = useMapStore((state) => state);
  const { setMyLocation, setRegionName, setPlaceList } = useMapStore();

  const mapInstanceRef = useRef<unknown>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [keyword, setKeyword] = useState("이태원 맛집");

  const handleSearchResult = (data: any[], status: any, pagination: any) => {
    if (status === kakao.maps.services.Status.OK) {
      setPlaces(data);
      setPagination(pagination);
      // 👉 마커 표시 및 지도 리셋도 여기서 진행
      placeToMarker({ placeInfos: data }, mapInstanceRef.current);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 없습니다.");
      setPlaces([]);
    } else {
      alert("검색 중 오류 발생");
    }
  };

  useEffect(() => {
    loadKakaoMapSdk(() => {
      if (!mapRef.current) return;
      initializeMap(mapRef.current, (map) => {
        mapInstanceRef.current = map;
        moveMyLocation(map, setMyLocation); // 내 위치 추적하여 전역상태변수에 위도경도 저장
        updateCenterAddress(map, setRegionName); // 지도 중심 주소 업데이트 및 내 위치 행정동 저장
      });
    });
  }, []);

  // 내 위치가 바뀔 때마다 placeList가 갱신
  // 만약 인근에 조회된 장소가 없다면 null로 초기화
  useEffect(() => {
    const map = mapInstanceRef.current;

    if (placeList == null) {
      setPlaceList(null);
    }

    placeToMarker(placeList!, map);
  }, [myLocation]);

  return (
    <>
      <div ref={mapRef} className="absolute w-screen h-screen left-0" />
      <div className="absolute bottom-4 right-4 z-50 w-80 max-h-[80vh] bg-white bg-opacity-95 shadow-xl rounded-xl p-4 flex flex-col gap-4 overflow-hidden">
        {/* 검색 입력 영역 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (mapInstanceRef.current) {
              searchKeyword(mapInstanceRef.current, keyword, handleSearchResult);
            }
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="장소 검색"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            검색
          </button>
        </form>

        {/* 검색 결과 리스트 */}
        <ul className="overflow-y-auto flex-1 text-sm space-y-2">
          {places.map((place, index) => (
            <li
              key={place.id}
              className="border rounded-md p-2 hover:bg-gray-100 transition cursor-pointer"
              onClick={() => {
                const latlng = new kakao.maps.LatLng(Number(place.y), Number(place.x));
                (mapInstanceRef.current as kakao.maps.Map).setCenter(latlng);
              }}
            >
              <div className="font-medium text-gray-900">
                {index + 1}. {place.place_name}
              </div>
              <div className="text-gray-500">
                {place.road_address_name || place.address_name}
              </div>
            </li>
          ))}
        </ul>

        {/* 페이징 버튼 */}
        {pagination && (
          <div className="flex justify-center mt-2 gap-1 flex-wrap">
            {Array.from({ length: pagination.last }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => pagination.gotoPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm border ${
                  pagination.current === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
