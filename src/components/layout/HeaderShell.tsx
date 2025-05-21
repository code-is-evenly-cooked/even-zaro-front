"use client";

import { useState } from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

export default function HeaderShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
