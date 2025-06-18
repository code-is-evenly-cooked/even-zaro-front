"use client";

import { useUser } from "@/hooks/useUser";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const { isSocialLogin, setUser, clearUser } = useAuthStore();
  const { status, data: session } = useSession();
  const { data, error, refetch } = useUser({ enabled: false });

  useEffect(() => {
    if (pathName.includes("login") || pathName.includes("signup")) return;

    if (status === "authenticated" && isSocialLogin) {
      refetch(); // 세션 존재 시 유저 정보 요청
    }
  }, [status, refetch, pathName, isSocialLogin, session?.user?.accessToken]);

  useEffect(() => {
    if (data) setUser(data);
    if (error) clearUser();
  }, [data, error, setUser, clearUser]);

  return <>{children}</>;
};

export default AuthInitializer;
