"use client";

import { useEffect, useState } from "react";
import BookmarkGroupCard from "./BookmarkGroupCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { useBookmarkGroups } from "@/hooks/useBookmarkGroups";
import { mockBookmarkGroups } from "@/mock/bookmarkGroup.mock";
import type { BookmarkGroupType } from "@/types/bookmark";
import { createBookmarkGroup } from "@/lib/api/bookmark";

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

  // 즐겨찾기 그룹 추가
  const handleCreateGroup = async () => {
    const name = prompt("새 그룹 이름을 입력하세요:");
    if (!name?.trim()) return;

    try {
      const newGroup = await createBookmarkGroup(name.trim());
      setGroupList((prev) => [...prev, newGroup]);
    } catch (e) {
      console.error("그룹 생성 실패", e);
      alert("그룹 생성에 실패했습니다.");
    }
  };

  return (
      <div className="space-y-2">
      {/* 그룹 추가 버튼 */}
      <div className="flex justify-end mb-2">
        <button
          onClick={handleCreateGroup}
          className="text-sm text-violet600 underline hover:text-violet800"
        >
          그룹 추가
        </button>
      </div>

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
