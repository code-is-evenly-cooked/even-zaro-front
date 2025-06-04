import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteItems } from "@/lib/api/favorite";

export const useFavoriteItems = (groupId: number | null) => {
  return useQuery({
    queryKey: ["favoriteItems", groupId],
    queryFn: () => {
      if (!groupId) throw new Error("그룹 ID 없음");
      return fetchFavoriteItems(groupId);
    },
    enabled: !!groupId, // groupId 있을 때만 실행
    staleTime: 1000 * 60 * 5,
  });
};
