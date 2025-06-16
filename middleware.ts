import { NextResponse } from "next/server";
import crypto from "crypto";

export function middleware() {
  const nonce = crypto.randomBytes(16).toString("base64");
  const response = NextResponse.next();

  response.headers.set("x-nonce", nonce);
  response.headers.set(
    "Content-Security-Policy",
    [
      `default-src 'self';`,
      `script-src 'self' 'nonce-${nonce}' https://developers.kakao.com https://dapi.kakao.com http://t1.daumcdn.net;`,
      `style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;`,
      `style-src-elem 'self' https://cdn.jsdelivr.net;`,
      `img-src 'self' data: blob: https://k.kakaocdn.net https://d1eni2d3ighqku.cloudfront.net http://t1.daumcdn.net https://dapi.kakao.com https://map.kakao.com http://mts.daumcdn.net;`,
      `font-src 'self' data: https://cdn.jsdelivr.net;`,
      `connect-src 'self' https://kauth.kakao.com https://kapi.kakao.com https://dapi.kakao.com http://dapi.kakao.com https://api.evencode.shop;`,
      `frame-src https://kauth.kakao.com;`,
      `object-src 'none';`,
    ].join(" "),
  );

  response.cookies.set("nonce", nonce); // 쿠키로도 전달
  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
