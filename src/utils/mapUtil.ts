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

// 지도 초기화 함수
export const initializeMap = (container: HTMLDivElement) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const center = new window.kakao.maps.LatLng(lat, lng);

      new window.kakao.maps.Map(container, {
        center,
        level: 3,
      });
    },
    () => {
      const fallback = new window.kakao.maps.LatLng(37.5665, 126.978); // 서울 시청
      new window.kakao.maps.Map(container, {
        center: fallback,
        level: 5,
      });
    },
  );
};