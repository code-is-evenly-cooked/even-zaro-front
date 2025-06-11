import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/fetch/client";
import type { ProfileResponse } from "@/types/profile";

export const useProfile = (userId: string | null) => {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => {
      if (userId === null) throw new Error("존재하지 않는 유저입니다.");
      return client<ProfileResponse>(`/profile/${userId}`);
    },
    enabled: userId !== null,
    staleTime: 1000 * 60 * 5,
  });
};
