"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import Header from "./Header/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const hideHeaderRoutes = [
    "/login",
    "/signup",
    "/password-forget",
    "/password-reset",
  ];

  const shouldHideHeader = hideHeaderRoutes.includes(pathname);

  return (
    <div className="h-screen flex flex-col">
      {!shouldHideHeader && (
        <Header
          onLoginClick={() => router.push("/login")}
        />
      )}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
