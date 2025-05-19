"use client";

import { SessionProvider } from "next-auth/react";
import { ToastMessageProvider } from "./ToastMessageProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastMessageProvider>{children}</ToastMessageProvider>
    </SessionProvider>
  );
}
