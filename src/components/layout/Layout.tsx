import { ReactNode } from "react";
import HeaderShell from "./Header/HeaderShell";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen mx-8">
      <HeaderShell />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
