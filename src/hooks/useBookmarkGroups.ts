import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/fetch/client";
import type { BookmarkGroupType } from "@/types/bookmark";

const fetchBookmarkGroups = async (
  userId: number,
): Promise<BookmarkGroupType[]> => {
  return await client<BookmarkGroupType[]>(`/group/user/${userId}/group`, {
    method: "GET",
  });
};

export const useBookmarkGroups = (userId: number | null) => {
  return useQuery({
    queryKey: ["bookmarkGroups", userId],
    queryFn: () => {
      if (!userId) throw new Error("userId가 없습니다");
      return fetchBookmarkGroups(userId);
    },
    enabled: userId !== null,
    staleTime: 1000 * 60 * 5,
  });
};
