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
  callback: (map: any) => void
) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const center = new window.kakao.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
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
    }
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
      latlng: new kakao.maps.LatLng(37.55123, 127.1234455)
    }
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
