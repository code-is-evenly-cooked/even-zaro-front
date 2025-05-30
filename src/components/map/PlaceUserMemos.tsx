import React from "react";
import { MoreIcon, StarIcon } from "@/components/common/Icons";

export default function PlaceUserMemos() {
  return (
    <div className="flex absolute left-[400px] -bottom-4 z-10 w-96 h-96 bg-white rounded-t-2xl shadow-lg overflow-hidden">
      <div className="relative w-full px-4 py-4">
        {/* 우측 상단 더보기 아이콘 */}
        <div className="absolute top-4 right-4">
          <MoreIcon className="w-5 h-5 text-gray-500 mt-0.5" />
        </div>

        {/* 중앙 정렬된 아이콘 + 텍스트 */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2">
            {/* 아이콘 */}
            <StarIcon className="flex self-start mt-0.5 w-5 h-5 text-gray-700" />

            {/* 텍스트 블록 */}
            <div className="flex flex-col justify-center">
              <span className="font-bold text-gray-900 text-lg leading-snug">
                갓덴스시 강남점
              </span>
              <span className="text-xs text-gray-500 leading-snug">
                서울 강남구 테헤란로 109
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
