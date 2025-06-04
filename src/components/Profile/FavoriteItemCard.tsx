import type { FavoriteItemType } from "@/types/favorite";

interface Props {
  item: FavoriteItemType;
}

export default function FavoriteItemCard({ item }: Props) {
  return (
    <li className="p-4 border rounded-md shadow-sm space-y-1">
      <div className="font-semibold">
        장소 이름
        <span className="font-normal text-gray600 ml-4">{item.address}</span>
      </div>
      <p className="text-sm text-gray600">여기는 메모 자리 - {item.memo}</p>
      <p className="text-xs text-gray600">
        위도: {item.lat}, 경도: {item.lng}
      </p>
    </li>
  );
}
