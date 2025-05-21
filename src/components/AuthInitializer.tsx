import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useAuthStore, UserInfo } from "@/stores/useAuthStore";
import { client } from "@/lib/fetch/client";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { setUser, clearUser, setInitialized, isInitialized } = useAuthStore();

  const initializeAuth = async () => {
    try {
      const session = await getSession();
      const kakaoAccessToken = session?.user?.accessToken;
      let user: UserInfo | null = null;

      if (kakaoAccessToken) {
        user = await client<UserInfo>("/api/auth/signin/social", {
          method: "POST",
          body: JSON.stringify({
            accessToken: kakaoAccessToken,
          }),
        });
      } else {
        user = await client<UserInfo>("/api/users/my");
      }

      setUser(user);
    } catch (err) {
      console.error("AuthInitializer Error:", err);
      clearUser();
    } finally {
      setInitialized();
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      initializeAuth();
    }
  }, [isInitialized]);

  return <>{children}</>;
};

export default AuthInitializer;
