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
  headers: async () => {
    // const isDev = process.env.NODE_ENV === "development";
    const isDev = process.env.NEXT_PUBLIC_APP_ENV === "dev";

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              `default-src 'self';`,
              `script-src 'self' https://developers.kakao.com https://dapi.kakao.com http://t1.daumcdn.net${isDev ? " 'unsafe-inline' 'unsafe-eval'" : ""};`,
              `style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;`,
              `style-src-elem 'self' https://cdn.jsdelivr.net${isDev ? " 'unsafe-inline'" : ""};`,
              `img-src 'self' data: blob: https://k.kakaocdn.net https://d1eni2d3ighqku.cloudfront.net http://t1.daumcdn.net https://dapi.kakao.com https://map.kakao.com http://mts.daumcdn.net;`,
              `font-src 'self' data: https://cdn.jsdelivr.net;`,
              `connect-src 'self' https://kauth.kakao.com https://kapi.kakao.com https://dapi.kakao.com http://dapi.kakao.com https://api.evencode.shop;`,
              `frame-src https://kauth.kakao.com;`,
              `object-src 'none';`,
            ].join(" "),
          },
        ],
      },
    ];
  },
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = "cheap-module-source-map";
    }
    return config;
  },
};

export default nextConfig;
