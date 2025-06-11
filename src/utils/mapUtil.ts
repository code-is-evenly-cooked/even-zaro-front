// Kakao 객체를 전역 선언합니다.
declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: new (lat: number, lng: number) => void;
        Map: new (
          container: HTMLElement,
          options: { center: void; level: number },
        ) => void;
        load: (callback: () => void) => void;
      };
    };
  }
}

import { markerInfo, PlaceListResponse } from "@/types/map";

// declare global {
//   interface Window {
//     kakao: any; // kakao.maps.* 전부 포괄
//   }
// }

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

// 마커 표시 함수 (재사용 가능)
export const addMarkers = (map: any) => {
  const kakao = window.kakao;

  // 마커 목록
  const positions = [
    {
      title: "카카오",
      latlng: new kakao.maps.LatLng(33.450705, 126.570677),
    },
    {
      title: "생태연못",
      latlng: new kakao.maps.LatLng(33.450936, 126.569477),
    },
    {
      title: "텃밭",
      latlng: new kakao.maps.LatLng(33.450879, 126.56994),
    },
    {
      title: "근린공원",
      latlng: new kakao.maps.LatLng(33.451393, 126.570738),
    },
    {
      title: "dd",
      latlng: new kakao.maps.LatLng(37.55123, 127.1234455),
    },
  ];

  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  const imageSize = new kakao.maps.Size(24, 35);
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  positions.forEach((pos) => {
    new kakao.maps.Marker({
      map,
      position: pos.latlng,
      title: pos.title,
      image: markerImage,
    });
  });
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


export function placeToMarker(places: PlaceListResponse | null, map: any) {
  if (!places || !places.placeInfos || places.placeInfos.length === 0) {
    console.warn("placeToMarker: 유효한 장소 목록이 없습니다.");

    return;
  }

  const positions: markerInfo[] = places.placeInfos.map((place) => ({
    title: place.name,
    latlng: { lat: place.lat, lng: place.lng },
  }));

  const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  const imageSize = new window.kakao.maps.Size(24, 35);
  const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

  positions.forEach((pos) => {
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(pos.latlng.lat, pos.latlng.lng),
      title: pos.title,
      image: markerImage,
    });

    marker.setMap(map);
  });
}