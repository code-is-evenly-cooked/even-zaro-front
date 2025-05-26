import { MAIN_CATEGORIES, MainCategory } from "@/types/category";
import { getMainCategoryLabel } from "@/utils/category";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

interface MainCategoryDropdownProps {
  selectedCategory: MainCategory | null;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  selectCategory: (category: MainCategory | null) => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  dropdownRef: React.RefObject<HTMLUListElement | null>;
  buttonWidth: number;
  showAllOption?: boolean;
}

const MainCategoryDropdown = ({
  selectedCategory,
  isDropdownOpen,
  toggleDropdown,
  selectCategory,
  buttonRef,
  dropdownRef,
  buttonWidth,
  showAllOption = true,
}: MainCategoryDropdownProps) => {
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className="flex items-center whitespace-nowrap bg-skyblue300 text-gray600 py-2 pl-3 pr-2 rounded-lg"
        onClick={toggleDropdown}
      >
        {selectedCategory === null
          ? "전체"
          : getMainCategoryLabel(selectedCategory)}
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
                selectedCategory === null &&
                  "font-bold text-gray900 hover:text-gray900",
              )}
              onClick={() => selectCategory(null)}
            >
              전체
            </li>
          )}

          {MAIN_CATEGORIES.map((category) => (
            <li
              key={category}
              className={clsx(
                "px-2 py-1 text-gray600 hover:text-gray600/80 cursor-pointer",
                selectedCategory === category &&
                  "font-bold text-gray900 hover:text-gray900",
              )}
              onClick={() => selectCategory(category)}
            >
              {getMainCategoryLabel(category)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MainCategoryDropdown;
