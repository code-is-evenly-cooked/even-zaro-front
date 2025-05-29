import { Food, Cafe, Etc, Market, Favorite } from "@/components/common/Icons/category";
import { JSX } from "react";

interface PlaceCardProps {
  placeName: string;
  address: string;
  category: string;
  favoriteCount: number;
}

const categoryIcons: Record<string, JSX.Element> = {
  Food: <Food />,
  Cafe: <Cafe />,
  Market: <Market />,
  Etc : <Etc />,
  Favorite : <Favorite />
};


export default function PlaceCard({
  placeName,
  address,
  category,
  favoriteCount,
}: PlaceCardProps) {
  return (
    <div className="flex items-center">
      {/* 이미지 영역 */}
      <div className="flex w-14 h-14 items-center justify-center mr-4 border border-gray-300 rounded-full">
        {categoryIcons[category] || <Etc />}
      </div>
      <div className="p-3 shadow-sm hover:bg-gray-100 transition">
        <h3 className="font-bold text-base">{placeName}</h3>
        <p className="text-sm text-gray-500">{address}</p>
        <p className="text-sm text-gray-400">즐겨찾기 {favoriteCount}개</p>
      </div>
    </div>
  );
}
