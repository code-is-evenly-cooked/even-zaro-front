"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Header = dynamic(() => import("./Header/Header"), {
  ssr: false,
});
const Sidebar = dynamic(() => import("./Sidebar/Sidebar"), {
  ssr: false,
});

export default function HeaderShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
