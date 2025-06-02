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
