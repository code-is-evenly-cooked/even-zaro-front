import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        pathname: "/**", // 하위 모든 경로 허용
      },
    ],
  },
};

export default nextConfig;
