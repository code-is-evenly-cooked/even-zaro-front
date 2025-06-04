"use client";

import { useFavoriteItems } from "@/hooks/useFavoriteItems";
import FavoriteItemCard from "@/components/Profile/FavoriteItemCard";

export default function FavoritePage({ groupId }: { groupId: number }) {
  const { data: items, isLoading, error } = useFavoriteItems(groupId);
  const displayItems = items?.filter((item) => !item.deleted) ?? [];

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {(error as Error).message}</div>;
  if (!items || items.length === 0) return <div>즐겨찾기 항목이 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h2 className="text-xl font-bold mb-4">즐겨찾기 그룹 상세</h2>
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
