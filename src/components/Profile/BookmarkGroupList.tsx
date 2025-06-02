"use client";

import BookmarkGroupCard from "./BookmarkGroupCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { useBookmarkGroups } from "@/hooks/useBookmarkGroups";
import { mockBookmarkGroups } from "@/mock/bookmarkGroup.mock";

export default function BookmarkGroupList() {
  const { user } = useAuthStore();
  const userId = user?.userId ?? null;

  const { data: groups, isLoading, error } = useBookmarkGroups(userId);

  if (isLoading) return <div>로딩 중...</div>;

  // 그룹 리스트가 없을 경우 목업 표시
  type APIError = Error & { code?: string };

  const isGroupListNotFoundError =
    error instanceof Error &&
    "code" in error &&
    (error as APIError).code === "GROUP_LIST_NOT_FOUND";

  const displayGroups = isGroupListNotFoundError ? mockBookmarkGroups : groups;

  if (error && !isGroupListNotFoundError)
    return <div>에러가 발생했습니다.</div>;

  if (!displayGroups || displayGroups.length === 0)
    return <div>즐겨찾기 그룹이 없습니다.</div>;

  return (
    <div className="space-y-2">
      {displayGroups.map((group) => (
        <BookmarkGroupCard key={group.groupId} group={group} />
      ))}
    </div>
  );
}
