"use client";

import { SessionProvider } from "next-auth/react";
import { ToastMessageProvider } from "./ToastMessageProvider";
import AuthInitializer from "@/components/AuthInitializer";
import { ToastMessageContainer } from "@/components/common/ToastMessage";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastMessageProvider>
        <AuthInitializer>
          {children}
          <ToastMessageContainer />
        </AuthInitializer>
      </ToastMessageProvider>
    </SessionProvider>
  );
}
