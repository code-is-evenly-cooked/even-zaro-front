import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d1eni2d3ighqku.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
  headers: async () => [
    {
      source: "/(.*)", // 모든 경로에 CSP 적용
      headers: [
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self';",
            "script-src 'self' https://developers.kakao.com;",
            "img-src 'self' data: https://k.kakaocdn.net https://d1eni2d3ighqku.cloudfront.net;",
            "style-src 'self' 'unsafe-inline';",
            "connect-src 'self' https://kauth.kakao.com https://kapi.kakao.com;",
            "frame-src https://kauth.kakao.com;",
            "object-src 'none';",
          ].join(" "),
        },
      ],
    },
  ],
};

export default nextConfig;
