"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import HeaderSkeleton from "./HeaderSkeleton";

const Header = dynamic(() => import("./Header"), {
  ssr: false,
  loading: () => <HeaderSkeleton />,
});
const Sidebar = dynamic(() => import("../Sidebar/Sidebar"), {
  ssr: false,
});

export default function HeaderShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Suspense>
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
      </Suspense>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
