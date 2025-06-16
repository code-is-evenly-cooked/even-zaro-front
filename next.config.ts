import type { NextConfig } from "next";
import webpack from "webpack";

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
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = "cheap-module-source-map";
    }
    config.plugins.push(
      new webpack.DefinePlugin({
        KAKAO_API_KEY_HERE: JSON.stringify(
          process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
        ),
      }),
    );
    return config;
  },
};

export default nextConfig;
