import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/api/auth";
import { APIErrorResponse } from "@/types/api";
import { useAuthStore, UserInfo } from "@/stores/useAuthStore";
import { getSession, signOut } from "next-auth/react";
import { deleteCookie, getCookie } from "cookies-next";

export const useUser = (options?: { enabled?: boolean }) => {
  return useQuery<UserInfo, APIErrorResponse>({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5, // 5분 캐시
    retry: (failureCount, error) => {
      if (error instanceof APIErrorResponse && error.statusCode === 401) {
        return false; // 인증 에러는 재시도 안 함
      }
      return failureCount < 1;
    },
    refetchOnWindowFocus: false,
    enabled: options?.enabled ?? true, // 기본 자동 실행
  });
};

export const useLogout = () => {
  const { clearUser, setIsSocialLogin } = useAuthStore();

  const logout = async (callbackUrl: string = "/") => {
    clearUser(); // 상태 초기화
    const session = await getSession();
    const kakaoAccessToken = session?.user?.kakaoAccessToken;

    if (kakaoAccessToken) {
      await fetch("/api/auth/unlink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kakaoAccessToken }),
      });
    }

    const accessToken = getCookie("access_token");
    await fetch("/api/auth/signout", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    deleteCookie("access_token");
    deleteCookie("refresh_token");
    setIsSocialLogin(false);
    await signOut({ callbackUrl });
  };

  return { logout };
};
