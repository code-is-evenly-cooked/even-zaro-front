"use client";

import React from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";
import FallbackMessage from "../Fallback/FallbackMessage";

interface AppErrorBoundaryProps {
  children: React.ReactNode;
  fallbackMessage?: string;
}

const DefaultFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center mt-10">
      <FallbackMessage message={`에러: ${error.message}`} />
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 rounded bg-violet-500 text-white"
      >
        다시 시도
      </button>
    </div>
  );
};

const AppErrorBoundary = ({
  children,
  fallbackMessage,
}: AppErrorBoundaryProps) => {
  return (
    <ReactErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        const isAuthError =
          (typeof error.message === "string" &&
            (error.message === "access token 없음" ||
              error.message.includes("401") ||
              error.message.includes("로그인"))) ??
          false;

        if (isAuthError)
          return (
            <FallbackMessage
              message="로그인이 필요한 서비스입니다."
              className="mt-10"
            />
          );

        if (fallbackMessage)
          return (
            <FallbackMessage message={fallbackMessage} className="mt-10" />
          );

        return (
          <DefaultFallback
            error={error}
            resetErrorBoundary={resetErrorBoundary}
          />
        );
      }}
      onError={(error, info) => {
        console.error("ErrorBoundary:", error, info);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default AppErrorBoundary;
