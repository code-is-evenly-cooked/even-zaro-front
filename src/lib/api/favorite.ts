import { client } from "@/lib/fetch/client";
import type { FavoriteGroupType, FavoriteItemType } from "@/types/favorite";

// 즐겨찾기 그룹 추가
export const createFavoriteGroup = async (
  groupName: string,
): Promise<FavoriteGroupType | null> => {
  return await client<FavoriteGroupType | null>("/group", {
    method: "POST",
    body: JSON.stringify({ groupName }),
  });
};

// 즐겨찾기 그룹 목록 조회
export const fetchFavoriteGroups = async (
  userId: number,
): Promise<FavoriteGroupType[]> => {
  return await client<FavoriteGroupType[]>(`/group/user/${userId}/group`, {
    method: "GET",
  });
};

// 즐겨찾기 그룹 이름 수정
export const updateFavoriteGroupName = async (
  groupId: number,
  groupName: string,
): Promise<void> => {
  return await client(`/group/${groupId}`, {
    method: "PATCH",
    body: JSON.stringify({ groupName }),
  });
};

// 즐겨찾기 그룹 삭제
export const deleteFavoriteGroup = async (groupId: number): Promise<void> => {
  return await client(`/group/${groupId}`, {
    method: "DELETE",
  });
};

// 즐겨찾기 목록 조회
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
