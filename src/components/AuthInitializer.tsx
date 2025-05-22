import { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useAuthStore, UserInfo } from "@/stores/useAuthStore";
import { client } from "@/lib/fetch/client";
import { useQuery } from "@tanstack/react-query";

const fetchUserKakaoAccessToken = async (): Promise<UserInfo> => {
  const session = await getSession();
  const kakaoAccessToken = session?.user?.accessToken;

  if (kakaoAccessToken) {
    return await client<UserInfo>("/api/auth/signin/social", {
      method: "POST",
      body: JSON.stringify({
        accessToken: kakaoAccessToken,
      }),
    });
  } else {
    return await client<UserInfo>("/api/users/my");
  }
};

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { setUser, clearUser, setInitialized, isInitialized } = useAuthStore();

  const { data, error, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserKakaoAccessToken,
    enabled: !isInitialized,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
      setInitialized();
    }
    if (error) {
      clearUser();
      setInitialized();
    }
  }, [isSuccess, error, data]);

  return <>{children}</>;
};

export default AuthInitializer;
