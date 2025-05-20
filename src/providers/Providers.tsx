"use client";

import { ToastMessageProvider } from "./ToastMessageProvider";
import AuthInitializer from "@/components/AuthInitializer";
import { ToastMessageContainer } from "@/components/common/ToastMessage";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastMessageProvider>
      <AuthInitializer>
        {children}
        <ToastMessageContainer />
      </AuthInitializer>
    </ToastMessageProvider>
  );
}
