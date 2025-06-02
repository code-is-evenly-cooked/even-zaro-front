import { client } from "@/lib/fetch/client";

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

// 그룹 삭제
export const deleteBookmarkGroup = async (groupId: number): Promise<void> => {
  return await client(`/group/${groupId}`, {
    method: "DELETE",
  });
};
