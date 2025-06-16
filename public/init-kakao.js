window.__NEXT_PUBLIC_KAKAO_CLIENT_ID__ = "KAKAO_API_KEY_HERE";

if (!window.kakaoInit) {
  const script = document.createElement("script");
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${window.__NEXT_PUBLIC_KAKAO_CLIENT_ID__}&autoload=false&libraries=services`;
  script.async = true;
  script.onload = () => {
    window.kakao.maps.load(() => {
      console.log("Kakao Maps SDK loaded");
    });
  };
  document.head.appendChild(script);
  window.kakaoInit = true;
}
