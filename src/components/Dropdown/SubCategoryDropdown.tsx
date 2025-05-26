import { CATEGORY_MAP } from "@/constants/category";
import { getSubCategoryEmoji, getSubCategoryLabel } from "@/utils/category";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import type { MainCategory, SubCategoryValue } from "@/types/category";

interface SubCategoryDropdownProps {
  selectedMainCategory: MainCategory;
  selectedSubCategory: SubCategoryValue | "전체";
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  selectSubCategory: (subCategory: SubCategoryValue | "전체") => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  dropdownRef: React.RefObject<HTMLUListElement | null>;
  buttonWidth: number;
  showAllOption?: boolean;
}

const SubCategoryDropdown = ({
  selectedMainCategory,
  selectedSubCategory,
  isDropdownOpen,
  toggleDropdown,
  selectSubCategory,
  buttonRef,
  dropdownRef,
  buttonWidth,
}: SubCategoryDropdownProps) => {
  const category =
    CATEGORY_MAP[selectedMainCategory as keyof typeof CATEGORY_MAP];

  // 잘못된 mainCategory가 들어올 경우 렌더링 안 함
  if (!category) return null;

  const subCategories = category.options;

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className="flex items-center whitespace-nowrap bg-skyblue300 text-gray600 py-2 pl-3 pr-2 rounded-lg"
        onClick={toggleDropdown}
      >
        {selectedSubCategory !== "전체" &&
        getSubCategoryEmoji(selectedSubCategory) &&
        getSubCategoryLabel(selectedSubCategory) ? (
          <>
            {getSubCategoryEmoji(selectedSubCategory)}{" "}
            {getSubCategoryLabel(selectedSubCategory)}
          </>
        ) : (
          "태그 선택"
        )}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isDropdownOpen && (
        <ul
          ref={dropdownRef}
          className="absolute z-10 top-full mt-2 w-max bg-skyblue300 rounded-lg p-2 shadow-md text-gray900"
          style={{ minWidth: buttonWidth }}
        >
          {showAllOption && (
            <li
              key="전체"
              className={clsx(
                "px-2 text-gray600 hover:text-gray600/80 cursor-pointer",
                selectedSubCategory === null &&
                  "font-bold text-gray900 hover:text-gray900",
              )}
              onClick={() => selectSubCategory(null)}
            >
              태그 선택
            </li>
          )}
          {subCategories.map((option) => (
            <li
              key={option.tag}
              onClick={() => selectSubCategory(option.tag)}
              className={clsx(
                "px-2 py-1 text-gray600 hover:text-gray600/80 cursor-pointer",
                selectedSubCategory === option.tag &&
                  "font-bold text-gray900 hover:text-gray900",
              )}
            >
              {option.emoji} {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubCategoryDropdown;
