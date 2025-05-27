"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Footer = () => {
  const pathname = usePathname();
  const hideFooterRoutes = [
    "/login",
    "/signup",
    "/password-forget",
    "/password-reset",
    "/email-validation",
    "/policy/terms",
    "/policy/privacy",
    "/editor",
  ];

  if (hideFooterRoutes.includes(pathname)) return null;
  return (
    <footer className="w-full bg-white text-gray600 text-sm py-6 border-t mb-5">
      <div className="max-w-5xl px-4 sm:mx-auto space-y-4">
        <div className="flex flex-col justify-start gap-6 text-xs text-gray-500 sm:flex-row sm:justify-between">
          <span className="font-medium">Code is Evenly Cooked</span>
          <div className="flex flex-col sm:flex-row justify-center gap-2 text-xs text-gray-500 sm:gap-6">
            <Link
              href="/policy/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline cursor-pointer"
            >
              이용약관
            </Link>
            <Link
              href="/policy/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline cursor-pointer"
            >
              개인정보처리방침
            </Link>
            <span className="hover:underline cursor-pointer">
              위치기반서비스 이용약관
            </span>
          </div>
        </div>

        <div className="pt-5 text-left text-sm text-gray900">
          <div>© ZARO 2025</div>
          <div>김나현, 김성민, 김유림, 이지은, 심동훈, 진상휘</div>
          <div className="text-gray600">문의 | zaro.even.team@gmail.com</div>
        </div>

        <p className="mb-5 pt-5 text-xs text-gray-400 text-left">
          ZARO는 본 플랫폼을 통한 통신판매 및 정보 제공의 당사자가 아니며, 해당
          거래정보 및 내용에 대하여 책임을 지지 않습니다.
        </p>
      </div>
    </footer>
  );
};
