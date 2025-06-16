import type { Metadata } from "next";
import "./globals.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import Providers from "@/providers/Providers";
import Layout from "@/components/layout/Layout";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "ZARO",
  description: "자취러들 사이의 은밀한 커넥션",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const nonce = cookieStore.get("nonce")?.value;

  return (
    <html lang="ko">
      <head>
        <script nonce={nonce} src="/init-kakao.js" />
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.__NEXT_PUBLIC_KAKAO_CLIENT_ID__ = "${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}";`,
          }}
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body>
        <Providers>
          <Layout>{children}</Layout>
          <div id="root-modal"></div>
        </Providers>
      </body>
    </html>
  );
}
