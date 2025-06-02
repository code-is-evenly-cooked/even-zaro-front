import { client } from "@/lib/fetch/client";
import type { BookmarkGroupType } from "@/types/bookmark";

// 즐겨찾기 그룹 목록 조회
export const fetchBookmarkGroups = async (
  userId: number,
): Promise<BookmarkGroupType[]> => {
  return await client<BookmarkGroupType[]>(`/group/user/${userId}/group`, {
    method: "GET",
  });
};

// 즐겨찾기 그룹 이름 수정
export const updateBookmarkGroupName = async (
  groupId: number,
  groupName: string,
): Promise<void> => {
  return await client(`/group/${groupId}`, {
    method: "PATCH",
    body: JSON.stringify({ groupName }),
  });
};

// 즐겨찾기 그룹 삭제
export const deleteBookmarkGroup = async (groupId: number): Promise<void> => {
  return await client(`/group/${groupId}`, {
    method: "DELETE",
  });
};
