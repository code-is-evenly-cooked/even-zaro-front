"use client";

import { useEffect, useState } from "react";
import BookmarkGroupCard from "./BookmarkGroupCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { useBookmarkGroups } from "@/hooks/useBookmarkGroups";
import { mockBookmarkGroups } from "@/mock/bookmarkGroup.mock";
import type { BookmarkGroupType } from "@/types/bookmark";

export default function BookmarkGroupList() {
  const { user } = useAuthStore();
  const userId = user?.userId ?? null;

  const { data: groups, isLoading, error } = useBookmarkGroups(userId);
  const [groupList, setGroupList] = useState<BookmarkGroupType[]>([]);

  // 초기 값을 setGroupList를 통해 useState 로 저장
  useEffect(() => {
    if (groups) {
      setGroupList(groups);
    } else if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: string }).code === "GROUP_LIST_NOT_FOUND"
    ) {
      setGroupList(mockBookmarkGroups);
    }
  }, [groups, error]);

  const handleDeleteGroup = (groupId: number) => {
    setGroupList((prev) => prev.filter((group) => group.groupId !== groupId));
  };

  if (isLoading) return <div>로딩 중...</div>;

  if (!groupList || groupList.length === 0)
    return <div>즐겨찾기 그룹이 없습니다.</div>;

  return (
    <div className="space-y-2">
      {groupList.map((group) => (
        <BookmarkGroupCard
          key={group.groupId}
          group={group}
          onDelete={handleDeleteGroup}
        />
      ))}
    </div>
  );
}
