import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        pathname: "/**", // 하위 모든 경로 허용
      },
      {
        protocol: "https",
        hostname: "d1eni2d3ighqku.cloudfront.net",
        pathname: "/**", // 하위 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
