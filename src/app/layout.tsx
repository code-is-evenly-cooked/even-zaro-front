import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/layout/Layout";

export const metadata: Metadata = {
  title: "ZARO",
  description: "자취러들 사이의 은밀한 커넥션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
