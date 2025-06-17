import { useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useClickOutside } from "@/hooks/useClickOutside";
import type { CategoryType, SortType } from "@/types/map";

interface HotPlaceHeaderProps {
  activeCategory: CategoryType;
  setActiveCategory: (category: CategoryType) => void;
  sortType: SortType;
  setSortType: (type: SortType) => void;
}

export default function HotPlaceHeader({
  activeCategory,
  setActiveCategory,
  sortType,
  setSortType,
}: HotPlaceHeaderProps) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 카테고리 탭 라벨 매핑 및 상수 분리
  const categoryTabs: { label: string; value: CategoryType }[] = [
    { label: "전체", value: "All" },
    { label: "카페", value: "CE7" },
    { label: "음식점", value: "FD6" },
    // TODO: 탭 확장 고민
    // { label: "편의점", value: "CS2" },
    // { label: "마트", value: "MT1" },
    { label: "기타", value: "Etc" },
  ];

  // 정렬 옵션 라벨 매핑 및 상수 분리
  const sortOptions: { label: string; value: SortType }[] = [
    { label: "즐겨찾기 순", value: "favorite" },
    { label: "거리 순", value: "distance" },
    { label: "이름 순", value: "name" },
  ];

  // 외부 클릭이나 ESC 키 입력 시 드롭다운 닫기
  useClickOutside(dropdownRef, () => setOpenDropdown(false), {
    enableEscape: true,
  });

  return (
    <div className="flex justify-between items-center px-2">
      {/* 카테고리 탭 */}
      <div className="flex gap-2">
        {categoryTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveCategory(tab.value)}
            className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap ${
              activeCategory === tab.value
                ? "bg-violet800 text-white"
                : "bg-white text-gray700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 정렬 드롭다운 */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="text-sm px-3 py-1 w-[110px] border rounded-md bg-white flex items-center justify-between"
          onClick={() => setOpenDropdown((prev) => !prev)}
        >
          {sortOptions.find((option) => option.value === sortType)?.label}
          {openDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {openDropdown && (
          <ul className="absolute right-0 mt-1 w-[110px] bg-white border rounded-md shadow z-10 text-sm">
            {sortOptions.map((option) => (
              <li
                key={option.value}
                className={`px-3 py-2 cursor-pointer ${
                  sortType === option.value ? "bg-gray100 font-semibold" : ""
                }`}
                onClick={() => {
                  setSortType(option.value);
                  setOpenDropdown(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
