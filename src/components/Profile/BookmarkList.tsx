"use client";

import BookmarkGroup from "./BookmarkGroup";
import type { BookmarkGroupType } from "@/types/bookmark";
import { mockBookmarkGroups } from "@/mock/bookmarkGroup.mock";

export default function BookmarkList() {
  const groups: BookmarkGroupType[] = mockBookmarkGroups;

  return (
    <div className="space-y-1">
      {groups.map((group) => (
        <BookmarkGroup key={group.groupId} group={group} />
      ))}
    </div>
  );
}
