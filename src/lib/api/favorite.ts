import { client } from "@/lib/fetch/client";
import type { FavoriteItemType } from "@/types/favorite";

// 즐겨찾기 조회
export const fetchFavoriteItems = (
  groupId: number,
): Promise<FavoriteItemType[]> => {
  return client(`/favorite/${groupId}/items`, {
    method: "GET",
    needAuth: true,
  });
};

// 즐겨찾기 메모 수정
export const updateFavoriteItem = async (
  favoriteId: number,
  memo: string,
): Promise<void> => {
  return await client(`/favorite/${favoriteId}`, {
    method: "PATCH",
    body: JSON.stringify({ memo }),
  });
};

// 즐겨찾기 삭제
export const deleteFavoriteItem = async (favoriteId: number): Promise<void> => {
  return await client(`/favorite/${favoriteId}`, {
    method: "DELETE",
  });
};
