import { fetchWithAuthClient } from "@/lib/fetch/fetchWithAuth.client";
import { useAuthStore, UserInfo } from "@/stores/useAuthStore";
import { useCallback, useEffect } from "react";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { setUser, clearUser, setInitialized } = useAuthStore();

  const initializeAuth = useCallback(async () => {
    try {
      const user = await fetchWithAuthClient<UserInfo>("/api/users/my");
      setUser(user);
      console.log(user); // 추후 제거 예정
    } catch (err) {
      console.log(err);
      clearUser();
    } finally {
      setInitialized();
    }
  }, [setUser, clearUser, setInitialized]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <>{children}</>;
};

export default AuthInitializer;
