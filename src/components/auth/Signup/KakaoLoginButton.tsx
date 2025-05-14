import { KakaoIcon } from "@/components/common/Icons";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import React from "react";

interface KakaoLoginButtonProps {
  isLoading?: boolean;
  onClick: () => void;
}

const KakaoLoginButton = ({ isLoading, onClick }: KakaoLoginButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="relative flex justify-center items-center gap-2 w-full h-[3.25rem] bg-kakao hover:bg-kakao/80 rounded-lg font-bold text-gray900"
    >
      <span className="absolute left-4 top-1/2 -translate-y-1/2">
        <KakaoIcon />
      </span>
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <LoadingSpinner />
          로딩중...
        </span>
      ) : (
        <span>카카오 로그인</span>
      )}
    </button>
  );
};

export default KakaoLoginButton;
