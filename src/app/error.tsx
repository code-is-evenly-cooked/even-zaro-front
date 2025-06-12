"use client";

import BaseButton from "@/components/common/Button/BaseButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  const { clearUser } = useAuthStore();

  const isAuthError =
    (typeof error.message === "string" &&
      (error.message === "access token 없음" ||
        error.message.includes("401") ||
        error.message.includes("로그인"))) ??
    false;

  useEffect(() => {
    console.log(isAuthError);
    if (isAuthError) {
      clearUser(); // 상태 초기화
    }
  }, [isAuthError, clearUser]);

  const handleClick = () => {
    if (isAuthError) {
      window.location.href = "/login";
    } else {
      reset(); // 에러 다시 시도
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-2xl font-bold text-gray900">
        {isAuthError
          ? "로그인이 필요한 서비스입니다"
          : "에러가 발생했습니다 😥"}
      </h1>
      <BaseButton
        type="button"
        color="violet800"
        size="xl"
        className="mt-6"
        onClick={handleClick}
      >
        {isAuthError ? "로그인하기" : "다시 시도"}
      </BaseButton>
    </div>
  );
};

export default ErrorPage;
