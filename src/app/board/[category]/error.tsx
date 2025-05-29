"use client";

import BaseButton from "@/components/common/Button/BaseButton";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  const isAuthError = error.message === "access token 없음";

  const handleClick = () => {
    if (isAuthError) {
      window.location.href = "/login";
    } else {
      reset();
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
