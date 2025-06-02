"use client";

import BookmarkGroupCard from "./BookmarkGroupCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { useBookmarkGroups } from "@/hooks/useBookmarkGroups";

export default function BookmarkGroupList() {
  const { user } = useAuthStore();
  const userId = user?.userId ?? null;

  const { data: groups, isLoading, error } = useBookmarkGroups(userId);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!groups || groups.length === 0) return <div>즐겨찾기 그룹이 없습니다.</div>;

  return (
    <div className="space-y-1">
      {groups.map((group) => (
        <BookmarkGroupCard key={group.groupId} group={group} />
      ))}
    </div>
  );
}
