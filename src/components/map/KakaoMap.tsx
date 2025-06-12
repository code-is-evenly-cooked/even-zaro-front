"use client";

import { useEffect, useRef, useState } from "react";
import {
  clearMarkers,
  initializeMap,
  loadKakaoMapSdk,
  moveMyLocation,
  placeToMarker, placeToMarkerFromKakao,
  searchKeyword,
  updateCenterAddress,
} from "@/utils/mapUtil";
import { useMapStore } from "@/stores/mapStore";
import { ChevronDown, ChevronUp } from "lucide-react";
import { KakaoMapResponse } from "@/types/map";

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { placeList, myLocation, map } = useMapStore((state) => state);
  const { setMyLocation, setRegionName, setMap } = useMapStore();

  const mapInstanceRef = useRef<unknown>(null);
  const markerRefs = useRef<kakao.maps.Marker[]>([]);
  const overlayRefs = useRef<kakao.maps.CustomOverlay[]>([]);

  // 검색창 여닫힘 상태
  const [isExpanded, setIsExpanded] = useState(false);
  const [places, setPlaces] = useState<KakaoMapResponse[]>([]);

  // eslint-disable-next-line
  const [pagination, setPagination] = useState<any>(null); // any에 대해서 eslint 타입 검증 오류 무시
  const [keyword, setKeyword] = useState("이태원 맛집");

  // 검색 결과 컨트롤
  const handleSearchResult = (
    data: KakaoMapResponse[],
    status: kakao.maps.services.Status,
    // eslint-disable-next-line
    pagination: any, // any에 대해서 eslint 타입 검증 오류 무시
  ) => {
    clearMarkers(markerRefs, overlayRefs); // 기존의 마커 제거
    if (status === kakao.maps.services.Status.OK) {
      console.log("@@@@@@ data: ", data);
      setPlaces(data);
      setPagination(pagination);
      placeToMarkerFromKakao(
        data,
        mapInstanceRef.current as kakao.maps.Map,
        markerRefs,
        overlayRefs
      );
    } else {
      console.log("@@@@@@ 실패실패: ");
      setPlaces([]);
      setPagination(null);
      markerRefs.current.forEach((marker) => marker.setMap(null)); // 등록되어있는 마커들을 제거
      markerRefs.current = [];
    }
  };

  // 사용자의 위치에 따라 변하는 인근 장소 불러오기
  useEffect(() => {
    loadKakaoMapSdk(() => {
      if (!mapRef.current) return;
      initializeMap(mapRef.current, (map) => {
        mapInstanceRef.current = map;
        setMap(map); // 맵 객체 등록
        moveMyLocation(map, setMyLocation); // 내 위치 추적하여 전역상태변수에 위도경도 저장
        updateCenterAddress(map, setRegionName); // 지도 중심 주소 업데이트 및 내 위치 행정동 저장
      });
    });
  }, []);

  // 내 위치가 바뀔 때마다 placeList가 갱신
  useEffect(() => {
    if (!map || !myLocation || places.length > 0) return; // 검색 중이면 무시

    if (!placeList || !placeList.placeInfos?.length) {
      clearMarkers(markerRefs, overlayRefs);
      return;
    }

    clearMarkers(markerRefs, overlayRefs);
    placeToMarker(placeList, map, markerRefs, overlayRefs);
  }, [myLocation, placeList, places]);


  return (
    <>
      <div ref={mapRef} className="absolute w-screen h-screen left-0" />

      {/* 검색창 */}
      <div
        className={`absolute bottom-4 right-4 z-50 w-80 bg-white bg-opacity-95 shadow-xl rounded-xl transition-all duration-300 flex flex-col overflow-hidden ${
          isExpanded ? "h-[50vh]" : "h-14"
        }`}
      >
        {/* 헤더 */}
        <div
          className="flex justify-between items-center px-4 py-2 border-b cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="font-bold text-gray-800 text-sm">{isExpanded ? "검색결과" : "장소 검색"} </span>
          {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </div>

        {isExpanded && (
          <>
            {/* 검색 입력 영역 */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (mapInstanceRef.current) {
                  searchKeyword(
                    mapInstanceRef.current,
                    keyword,
                    handleSearchResult,
                  );
                }
              }}
              className="flex gap-2 p-2"
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
            <ul className="overflow-y-auto flex-1 text-sm space-y-2 px-2">
              {places.map((place, index) => (
                <li
                  key={place.id}
                  className="border rounded-md p-2 hover:bg-gray-100 transition cursor-pointer"
                  onClick={() => {
                    const latlng = new kakao.maps.LatLng(
                      Number(place.y),
                      Number(place.x),
                    );
                    (mapInstanceRef.current as kakao.maps.Map).setCenter(
                      latlng,
                    );
                  }}
                >
                  <div className="font-medium text-gray-900">
                    {index + 1}. {place.place_name}
                  </div>
                  <div className="text-gray-500">
                    {place.address_name}
                  </div>
                </li>
              ))}
            </ul>

            {/* 페이징 */}
            {pagination && (
              <div className="flex justify-center mt-2 gap-1 flex-wrap px-2 pb-2">
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
          </>
        )}
      </div>
    </>
  );
}
