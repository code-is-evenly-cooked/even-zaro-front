import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/layout/Layout";

export const metadata: Metadata = {
	title: "피날레",
	description: "이브니들의 구름에서 마지막 프로젝트",
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
