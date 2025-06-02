"use client";

import BookmarkGroupCard from "./BookmarkGroupCard";
import type { BookmarkGroupType } from "@/types/bookmark";
import { mockBookmarkGroups } from "@/mock/bookmarkGroup.mock";

export default function BookmarkList() {
  const groups: BookmarkGroupType[] = mockBookmarkGroups;

  return (
    <div className="space-y-1">
      {groups.map((group) => (
        <BookmarkGroupCard key={group.groupId} group={group} />
      ))}
    </div>
  );
}
