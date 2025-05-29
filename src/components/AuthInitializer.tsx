"use client";

import { useUser } from "@/hooks/useUser";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { setUser, clearUser } = useAuthStore();
  const { data, error } = useUser();

  useEffect(() => {
    if (data) setUser(data);
    if (error) clearUser();
  }, [data, error]);

  return <>{children}</>;
};

export default AuthInitializer;
