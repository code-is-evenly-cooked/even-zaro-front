"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
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

  // 헤더 숨겨야 할 pathname
  const hideHeaderRoutes = [
    "/login",
    "/signup",
    "/password",
    "/email",
    "/policy",
    "/map",
    "/withdrawal",
  ];

  const shouldHideHeader = hideHeaderRoutes.some((route) =>
    pathname.startsWith(route),
  );
  if (shouldHideHeader) return null;

  return (
    <>
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
