"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const hideHeaderRoutes = [
    "/login",
    "/signup",
    "/password-forget",
    "/password-reset",
    "/email-validation",
  ];

  const shouldHideHeader = hideHeaderRoutes.includes(pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {!shouldHideHeader && (
        <Header
          onMenuClick={() => setIsSidebarOpen(true)}
          onLoginClick={() => router.push("/login")}
        />
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
