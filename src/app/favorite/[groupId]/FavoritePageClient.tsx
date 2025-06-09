"use client";

import { useEffect, useState } from "react";
import { useFavoriteItems } from "@/hooks/useFavorite";
import FavoriteItemCard from "@/components/Favorite/FavoriteItemCard";
import { fetchFavoriteGroups } from "@/lib/api/favorite";
import FavoriteHeader from "@/components/Favorite/FavoriteHeader";

export default function FavoritePage({ groupId }: { groupId: number }) {
  const { data: items, isLoading, error } = useFavoriteItems(groupId);

  const displayItems = items ?? [];
  const [groupName, setGroupName] = useState<string>("");

  // 해당 groupId 그룹 이름 가져오기
  useEffect(() => {
    const fetchGroupName = async () => {
      const ownerId = items?.[0]?.userId;
      if (!ownerId) return;

      try {
        const groups = await fetchFavoriteGroups(ownerId);
        const matched = groups.find((g) => g.groupId === groupId);
        setGroupName(matched?.name ?? "(알 수 없음)");
      } catch {
        setGroupName("(그룹 이름 로딩 실패)");
      }
    };

    fetchGroupName();
  }, [groupId, items]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {(error as Error).message}</div>;
  if (!items || items.length === 0) return <div>즐겨찾기 항목이 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto py-6">
      {items?.[0]?.userId && <FavoriteHeader userId={items[0].userId} />}
      <div className="flex flex-col items-center gap-2 mb-8">
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
