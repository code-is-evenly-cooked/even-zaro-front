"use client";

import { useEffect, useState } from "react";
import { useFavoriteItems } from "@/hooks/useFavoriteItems";
import FavoriteItemCard from "@/components/Profile/FavoriteItemCard";
import { fetchBookmarkGroups } from "@/lib/api/bookmark";
import { useAuthStore } from "@/stores/useAuthStore";

export default function FavoritePage({ groupId }: { groupId: number }) {
  const { data: items, isLoading, error } = useFavoriteItems(groupId);
  const { user } = useAuthStore();

  const displayItems = items?.filter((item) => !item.deleted) ?? [];
  const [groupName, setGroupName] = useState<string>("");

  // 해당 groupId 그룹 이름 가져오기
  useEffect(() => {
    const fetchGroupName = async () => {
      if (!user?.userId) return;

      try {
        const groups = await fetchBookmarkGroups(user.userId);
        const matched = groups.find((g) => g.groupId === groupId);
        setGroupName(matched?.name ?? "(알 수 없음)");
      } catch {
        setGroupName("(그룹 이름 로딩 실패)");
      }
    };

    fetchGroupName();
  }, [groupId, user?.userId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {(error as Error).message}</div>;
  if (!items || items.length === 0) return <div>즐겨찾기 항목이 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="flex flex-col items-center gap-4 mb-10">
        <h2 className="text-xl font-bold">{groupName}</h2>
        <p className="text-gray600">장소 {displayItems.length}</p>
      </div>
      <ul className="space-y-2">
        {displayItems.map((item) => (
          <li key={item.id}>
            <FavoriteItemCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
