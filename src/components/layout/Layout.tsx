import { ReactNode } from "react";
import HeaderShell from "./Header/HeaderShell";
import { Footer } from "./Footer/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen">
      <HeaderShell />
      <main className="flex-1 mb-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
