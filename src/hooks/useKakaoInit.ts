import { useEffect } from "react";

export const useKakaoInit = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.Kakao && window.Kakao.isInitialized?.()) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!);
        console.log("Kakao SDK 초기화 완료");
      }
    };

    document.head.appendChild(script);
  }, []);
};
