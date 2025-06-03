import type { FavoriteItemType } from "@/types/favorite";

interface Props {
  item: FavoriteItemType;
}

export default function FavoriteItemCard({ item }: Props) {
  return (
    <li className="p-4 border rounded-md shadow-sm space-y-1">
      <p className="font-semibold">{item.address}</p>
      <p className="text-sm text-gray-500">{item.memo}</p>
      <p className="text-xs text-gray-400">
        위도: {item.lat}, 경도: {item.lng}
      </p>
    </li>
  );
}
