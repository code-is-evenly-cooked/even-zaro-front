/* eslint-disable */
// 해당 파일의 빌드 시 타입 추론 에러를 임시방편으로 막기 위해 추가한 주석입니다.
//

import {
  KakaoMapResponse,
  markerInfo,
  markerInfos,
  PlaceListResponse,
} from "@/types/map";

const KAKAO_MAP_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!;

// Kakao SDK 로드 함수
export const loadKakaoMapSdk = (callback: () => void) => {
  const script = document.createElement("script");
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false&libraries=services`;
  script.async = true;
  script.onload = () => {
    window.kakao.maps.load(callback);
  };
  document.head.appendChild(script);
};

// 지도 초기화
export const initializeMap = (
  container: HTMLDivElement,
  callback: (map: any) => void,
) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const center = new window.kakao.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude,
      );

      const map = new window.kakao.maps.Map(container, {
        center,
        level: 3,
      });

      callback(map);
    },
    () => {
      const fallback = new window.kakao.maps.LatLng(37.5665, 126.978); // 서울 시청
      const map = new window.kakao.maps.Map(container, {
        center: fallback,
        level: 5,
      });

      callback(map);
    },
  );
};

// 내 위치를 추적해서 전역상태변수에 저장
export function moveMyLocation(
  map: any,
  setMyLocation: (loc: { lat: number; lng: number }) => void,
) {
  window.kakao.maps.event.addListener(map, "center_changed", function () {
    // 지도의  레벨을 얻어옵니다
    // const level = map.getLevel();

    // 지도의 중심좌표를 얻어옵니다
    const latlng = map.getCenter();

    const lat = latlng.getLat();
    const lng = latlng.getLng();

    setMyLocation({ lat, lng });
  });
}

let geocoder: any = null;

export const setupGeocoder = () => {
  if (typeof window !== "undefined" && !geocoder) {
    geocoder = new window.kakao.maps.services.Geocoder();
  }
};

// 중심 좌표 주소정보를 가져와 콜백 실행
export function updateCenterAddress(
  map: any,
  setRegionName: (region: string) => void,
) {
  setupGeocoder();

  // 최초 1회 즉시 실행, null값 방지
  const center = map.getCenter();
  geocoder.coord2RegionCode(
    center.getLng(),
    center.getLat(),
    (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const region = result.find((r: any) => r.region_type === "H");
        if (region) {
          setRegionName(region.address_name);
        }
      }
    },
  );

  // 확대 축소 이벤트 감지
  window.kakao.maps.event.addListener(map, "idle", () => {
    const center = map.getCenter();
    geocoder.coord2RegionCode(
      center.getLng(),
      center.getLat(),
      (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const region = result.find((r: any) => r.region_type === "H");
          if (region) {
            setRegionName(region.address_name); // 행정동 이름을 전역 상태에 저장
          }
        }
      },
    );
  });
}

// Zaro API서버의 place테이블에서 받아온 데이터를 마커로 추가
export function placeToMarkerFromZaro(
  places: PlaceListResponse,
  map: kakao.maps.Map,
  markerRefs?: React.MutableRefObject<kakao.maps.Marker[]>,
  overlayRefs?: React.RefObject<kakao.maps.CustomOverlay[]>,
  onClickFavoriteAdd?: () => void,
) {
  if (!places || !places.placeInfos || places.placeInfos.length === 0) return;

  // 기존 마커 제거
  if (markerRefs) {
    markerRefs.current.forEach((marker) => marker.setMap(null));
    markerRefs.current = [];
  }

  const positions: markerInfos = places.placeInfos.map((place) => ({
    title: place.name,
    latlng: { lat: place.lat, lng: place.lng },
    category: place.category,
    name: place.name,
    lat: place.lat,
    lng: place.lng,
    placeId: place.placeId,
    address: place.address,
  }));

  // 즐겨찾기 마커
  const imageSrc = "/marker/favoriteMarker.svg";
  const imageSize = new window.kakao.maps.Size(24, 35);
  const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

  positions.forEach((place: markerInfo) => {
    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(place.lat, place.lng),
      title: place.name,
      image: markerImage,
      clickable: true,
      zIndex: 1,
    });

    marker.setMap(map);
    markerRefs?.current.push(marker);
    // 지도에 마커 정보 모달을 표시
    // Zaro API 응답에 맞게
    displayInfoWindowFromZaro(
      place,
      marker,
      map,
      overlayRefs,
      onClickFavoriteAdd,
    );
  });
}

// 검색어 입력필드 컨트롤
export function searchKeyword(
  map: any,
  keyword: string,
  callback: (data: any[], status: any, pagination: any) => void,
) {
  const ps = new window.kakao.maps.services.Places();
  if (!keyword.trim()) {
    alert("키워드를 입력해주세요!");
    return;
  }
  ps.keywordSearch(keyword, callback);
}

// 카카오 API 응답으로 받아온 장소들을 마커로 추가
export function placeToMarkerFromKakao(
  places: KakaoMapResponse[],
  map: kakao.maps.Map,
  markerRefs?: React.MutableRefObject<kakao.maps.Marker[]>,
  overlayRefs?: React.RefObject<kakao.maps.CustomOverlay[]>,
  onClickFavoriteAdd?: () => void,
  setSelectPlaceDetail?: (place: KakaoMapResponse) => void,
) {
  if (!places) return;

  places.forEach((place) => {
    let imageSrc = getMarkerIconByCategoryCode(place.category_group_code);
    const imageSize = new window.kakao.maps.Size(24, 35);
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
      title: place.place_name,
      image: markerImage,
      clickable: true,
      zIndex: 1,
    });

    marker.setMap(map);
    markerRefs?.current.push(marker);

    // 지도에 마커 정보 모달을 표시
    if (overlayRefs) {
      displayInfoWindowFromKakao(
        place,
        marker,
        map,
        overlayRefs,
        onClickFavoriteAdd,
        setSelectPlaceDetail,
      );
    }
  });
}

// 입력받은 장소들을 마커 객체를 이용해 map에 표시
function displayInfoWindowFromKakao(
  place: KakaoMapResponse,
  marker: any,
  map: kakao.maps.Map,
  overlayRefs?: React.RefObject<kakao.maps.CustomOverlay[]>,
  onClickFavoriteAdd?: () => void,
  setSelectPlaceDetail?: (place: KakaoMapResponse) => void,
) {
  // 간단한 라벨 스타일
  const simpleMarker = document.createElement("div");
  simpleMarker.innerHTML = `
    <div     
    style="
      flex-direction: row;
      background-color: white;
      padding: 3px 6px;
      border: 1px solid #ccc;
      border-radius: 16px;
      box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
      font-size: 12px;
      font-weight: 500;
      color: #333;
      white-space: nowrap;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      pointer-events: none;
    ">
      ${place.place_name}
    </div>
  `;

  // 상세 정보 오버레이
  const content = document.createElement("div");
  content.style.cssText = `
    background: white;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-family: Arial, sans-serif;
    font-size: 12px;
    line-height: 1.4;
    width: 240px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    position: relative;
  `;

  content.innerHTML = `
    <div style="position: absolute; top: 6px; right: 8px; cursor: pointer; font-weight: bold; color: #999;" id="close-btn-search">✕</div>
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">이름 : ${place.place_name}</div>
    <div style="color: #555;">주소 : ${place.address_name}</div>
    <div style="color: #888; font-size: 11px;">좌표: (${place.y}, ${place.x})</div>
    <div style="margin-top: 4px; color: #333;">카테고리 코드 : ${place.category_group_name}</div>
    <button id="add-btn" style="
      margin-top: 8px;
      padding: 5px 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">⭐ 즐겨찾기 추가</button>
  `;

  // 간단한 말풍선 인포윈도우
  const simpleCustomOverlay = new kakao.maps.CustomOverlay({
    map: map,
    content: simpleMarker,
    position: new kakao.maps.LatLng(place.y, place.x),
    yAnchor: 2.5,
    zIndex: 2,
  });
  overlayRefs?.current.push(simpleCustomOverlay);

  // 상세 정보 커스텀 오버레이 (초기엔 닫힘)
  const detailOverlay = new kakao.maps.CustomOverlay({
    map: undefined,
    position: new kakao.maps.LatLng(place.y, place.x),
    content: content,
    yAnchor: 1.5,
  });

  // 상세 정보 표시
  kakao.maps.event.addListener(marker, "click", () => {
    detailOverlay.setMap(map);

    setSelectPlaceDetail?.(place);
  });

  // 오버레이 닫기
  setTimeout(() => {
    const closeBtn = content.querySelector("#close-btn-search");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        detailOverlay.setMap(null);
      });
    }

    const addBtn = content.querySelector("#add-btn");
    if (addBtn) {
      if (addBtn && onClickFavoriteAdd) {
        addBtn.addEventListener("click", onClickFavoriteAdd);
      }
    }
  }, 0);
}

// Zaro API로부터 받은 PlaceInfo 타입의 객체를 마커로 추가
function displayInfoWindowFromZaro(
  place: markerInfo,
  marker: any,
  map: kakao.maps.Map,
  overlayRefs?: React.RefObject<kakao.maps.CustomOverlay[]>,
  onClickFavoriteAdd?: () => void,
) {
  // 간단 정보 모달
  const simpleMarker = document.createElement("div");
  simpleMarker.innerHTML = `
    <div 
    style="
      flex-direction: row;
      background-color: white;
      padding: 3px 6px;
      border: 1px solid #ccc;
      border-radius: 16px;
      box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
      font-size: 12px;
      font-weight: 500;
      color: #333;
      white-space: nowrap;
      display: inline-block;
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      pointer-events: none;
    ">
      ${place.name}
    </div>
  `;

  // 상세 정보 모달 (즐겨찾기 추가 포함)
  const detailMarker = document.createElement("div");
  detailMarker.style.cssText = `
  background: white;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-family: Arial, sans-serif;
    font-size: 12px;
    line-height: 1.4;
    width: 220px;
    word-wrap: break-word;
    overflow-wrap: break-word;
  `;
  detailMarker.innerHTML = `
    <div style="position: absolute; top: 6px; right: 8px; cursor: pointer; font-weight: bold; color: #999;" id="close-btn-nearby">✕</div>
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">이름 : ${place.name}</div>
    <div style="color: #555;">주소 : ${place.address}</div>
    <div style="color: #888; font-size: 11px;">좌표: (${place.lng}, ${place.lat})</div>
    <div style="margin-top: 4px; color: #333;">카테고리 코드 : ${place.category}</div>
    <button id="add-btn" style="
      margin-top: 8px;
      padding: 5px 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    ">⭐ 즐겨찾기 추가</button>
  `;

  const simpleOverLay = new kakao.maps.CustomOverlay({
    map: map,
    content: simpleMarker,
    position: new kakao.maps.LatLng(place.lat, place.lng),
    yAnchor: 2,
  });
  overlayRefs?.current.push(simpleOverLay);

  // 상세 정보 커스텀 오버레이 (초기엔 닫힘)
  const detailOverlay = new kakao.maps.CustomOverlay({
    map: undefined,
    position: new kakao.maps.LatLng(place.lat, place.lng),
    content: detailMarker,
    yAnchor: 1.5,
  });

  // 상세 정보 표시
  kakao.maps.event.addListener(marker, "click", () => {
    detailOverlay.setMap(map);
  });

  // 오버레이 닫기
  setTimeout(() => {
    const closeBtn = detailMarker.querySelector("#close-btn-nearby");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        detailOverlay.setMap(null);
      });
    }

    const addBtn = detailMarker.querySelector("#add-btn");
    if (addBtn) {
      if (addBtn && onClickFavoriteAdd) {
        addBtn.addEventListener("click", onClickFavoriteAdd);
      }
    }
  }, 0);
}

export function clearMarkers(
  markerRefs: React.MutableRefObject<kakao.maps.Marker[]>,
  overlayRefs?: React.RefObject<kakao.maps.CustomOverlay[]>,
) {
  if (markerRefs?.current) {
    markerRefs.current.forEach((marker) => marker.setMap(null));
    markerRefs.current = [];
  }

  if (overlayRefs?.current) {
    overlayRefs.current.forEach((overlay) => overlay.setMap(null));
    overlayRefs.current = [];
  }
}

// 카테고리 코드에 따라 마커 아이콘 지정
export function getMarkerIconByCategoryCode(code: string): string {
  switch (code) {
    case "FD6": // 식당
      return "/marker/restaurant.svg";
    case "CE7": // 카페
      return "/marker/cafe.svg";
    case "MT1": // 대형마트
    case "CS2": // 편의점
      return "/marker/shop.svg";
    default: // 그 외
      return "/marker/others.svg";
  }
}
