"use client";

import { ToastMessageProvider } from "./ToastMessageProvider";
import AuthInitializer from "@/components/AuthInitializer";
import { ToastMessageContainer } from "@/components/common/ToastMessage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ToastMessageProvider>
          <AuthInitializer>
            {children}
            <ToastMessageContainer />
          </AuthInitializer>
        </ToastMessageProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
