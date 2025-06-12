/* eslint-disable */
// 해당 파일의 빌드 시 타입 추론 에러를 임시방편으로 막기 위해 추가한 주석입니다.
//

import { KakaoMapResponse, markerInfos, PlaceListResponse } from "@/types/map";

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

export function placeToMarker(
  places: PlaceListResponse,
  map: kakao.maps.Map,
  markerRefs?: React.MutableRefObject<kakao.maps.Marker[]>
) {
  if (!places || !places.placeInfos || places.placeInfos.length === 0) return;

  // 기존 마커 제거
  if (markerRefs) {
    markerRefs.current.forEach(marker => marker.setMap(null));
    markerRefs.current = [];
  }

  const positions: markerInfos = places.placeInfos.map((place) => ({
    title: place.name,
    latlng: { lat: place.lat, lng: place.lng },
    category: place.category,
    name : place.name,
    lat: place.lat,
    lng: place.lng,
    placeId: place.placeId,
    address: place.address
  }));


  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  const imageSize = new window.kakao.maps.Size(24, 35);
  const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

  positions.forEach((place) => {
    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(place.lat, place.lng),
      title: place.name,
      image: markerImage,
    });

    marker.setMap(map);
    markerRefs?.current.push(marker);
  });
}

export function searchKeyword(
  map: any,
  keyword: string,
  callback: (data: any[], status: any, pagination: any) => void
) {
  const ps = new window.kakao.maps.services.Places();
  if (!keyword.trim()) {
    alert("키워드를 입력해주세요!");
    return;
  }
  ps.keywordSearch(keyword, callback);
}

export function placeToMarkerFromKakao(
  places: KakaoMapResponse[] ,
  map: kakao.maps.Map,
  markerRefs?: React.MutableRefObject<kakao.maps.Marker[]>
) {
  if (!places) return;

  // 기존 마커 제거
  if (markerRefs) {
    markerRefs.current.forEach(marker => marker.setMap(null));
    markerRefs.current = [];
  }

  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  const imageSize = new window.kakao.maps.Size(24, 35);
  const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

  places.forEach((place) => {
    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
      title: place.place_name,
      image: markerImage,
    });

    const infowindow = new kakao.maps.InfoWindow({zIndex:1});

    marker.setMap(map);
    markerRefs?.current.push(marker);

    // 지도에 마커 정보 모달을 표시
    displayInfowindow(place, marker, map, infowindow);
  });
}

function displayInfowindow(place: KakaoMapResponse, marker: any, map: kakao.maps.Map, infowindow) {
  // 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
  const content = `
  <div style="
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
  ">
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">이름 : ${place.place_name}</div>
    <div style="color: #555;">주소 : ${place.address_name}</div>
    <div style="color: #888; font-size: 11px; text-wrap;">좌표: (${place.y}, ${place.x})</div>
    <div style="margin-top: 4px; color: #333;">카테고리 코드 : ${place.category_group_name}</div>
  </div>
`;

  // 커스텀 오버레이가 표시될 위치입니다
  const position = new kakao.maps.LatLng(place.y, place.x);

  // 커스텀 오버레이를 생성합니다
  const customOverlay = new kakao.maps.CustomOverlay({
    map: map,
    position: position,
    content: content,
    yAnchor: 1
  });

  infowindow.setContent(content);
  infowindow.open(map, marker);
}



