"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import HeaderSkeleton from "./HeaderSkeleton";
import { usePathname } from "next/navigation";

const Header = dynamic(() => import("./Header"), {
  ssr: false,
  loading: () => <HeaderSkeleton />,
});
const Sidebar = dynamic(() => import("../Sidebar/Sidebar"), {
  ssr: false,
});

export default function HeaderShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // 숨길 전체 헤더 경로
  const hideHeaderRoutes = [
    "/login",
    "/signup",
    "/password-forget",
    "/password-reset",
    "/email-validation",
    "/policy/terms",
    "/policy/privacy",
    "/map",
    "/withdrawal-complete",
  ];

  if (hideHeaderRoutes.includes(pathname)) return null;

  return (
    <>
      <Suspense>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
      </Suspense>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
