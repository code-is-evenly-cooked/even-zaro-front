import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/api/auth";
import { APIErrorResponse } from "@/types/api";
import { UserInfo } from "@/stores/useAuthStore";

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
