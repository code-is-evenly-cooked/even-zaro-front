import { useQuery } from "@tanstack/react-query";
import { fetchBookmarkGroups } from "@/lib/api/bookmark";

export const useBookmarkGroups = (userId: number | null) => {
  return useQuery({
    queryKey: ["bookmarkGroups", userId],
    queryFn: () => {
      if (!userId) throw new Error("userId가 없습니다");
      return fetchBookmarkGroups(userId);
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};
