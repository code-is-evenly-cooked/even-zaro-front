import { client } from "@/lib/fetch/client";
import type { FavoriteItemType } from "@/types/favorite";

export const fetchFavoriteItems = (
  groupId: number,
): Promise<FavoriteItemType[]> => {
  return client(`/favorite/${groupId}/items`, {
    method: "GET",
    needAuth: true,
  });
};
