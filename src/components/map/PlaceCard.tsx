import {
  Cafe,
  Etc,
  Favorite,
  Food,
  Market,
} from "@/components/common/Icons/category";
import { JSX } from "react";

interface PlaceCardProps {
  placeName: string;
  address: string;
  category: string;
  favoriteCount: number;
  onClick?: () => void; // 클릭 시 동작할 함수
}

const categoryIcons: Record<string, JSX.Element> = {
  Food: <Food />,
  Cafe: <Cafe />,
  Market: <Market />,
  Etc: <Etc />,
  Favorite: <Favorite />,
};

export default function PlaceCard({
  placeName,
  address,
  category,
  favoriteCount,
  onClick,
}: PlaceCardProps) {
  return (
    <div
      className="flex items-center hover:bg-gray-100 transition p-1"
      onClick={onClick}
    >
      {/* 이미지 영역 */}
      <div className="flex w-14 h-14 items-center justify-center mr-4 border border-gray-300 rounded-full">
        {categoryIcons[category] || <Etc />}
      </div>
      <div className="flex-1 p-3 shadow-sm ">
        <h3 className="font-bold text-base ">{placeName}</h3>
        <p className="text-sm text-gray600">{address}</p>
        <p className="text-sm text-gray-400">즐겨찾기 {favoriteCount}개</p>
      </div>
    </div>
  );
}
