import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteGroups, fetchFavoriteItems } from "@/lib/api/favorite";

// 즐겨찾기 그룹 리스트 가져오기
export const useFavoriteGroups = (userId: string | null) => {
  return useQuery({
    queryKey: ["favoriteGroups", userId],
    queryFn: () => {
      if (!userId) throw new Error("userId가 없습니다");
      return fetchFavoriteGroups(Number(userId));
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};

// 특정 그룹의 즐겨찾기 장소 리스트 가져오기
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
