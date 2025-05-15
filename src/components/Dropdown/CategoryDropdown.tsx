import { MAIN_CATEGORIES } from "@/constants/categories";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

interface CategoryDropdownProps {
  selectedCategory: string;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  selectCategory: (category: string) => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  buttonWidth: number;
}

const CategoryDropdown = ({
  selectedCategory,
  isDropdownOpen,
  toggleDropdown,
  selectCategory,
  buttonRef,
  buttonWidth,
}: CategoryDropdownProps) => {
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        className="flex items-center bg-skyblue300 text-gray600 py-2 pl-3 pr-2 rounded-lg"
        onClick={toggleDropdown}
      >
        {selectedCategory}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>
      {isDropdownOpen && (
        <ul
          className="absolute z-10 top-full mt-2 w-max bg-skyblue300 rounded-lg p-2 shadow-md text-gray900"
          style={{ minWidth: buttonWidth }}
        >
          <li
            key="전체"
            className={clsx(
              "px-2 text-gray600 hover:text-gray600/80 cursor-pointer",
              selectedCategory === "전체" &&
                "font-bold text-gray900 hover:text-gray900",
            )}
            onClick={() => {
              selectCategory("전체");
            }}
          >
            전체
          </li>
          {MAIN_CATEGORIES.map((category) => (
            <li
              key={category}
              className={clsx(
                "px-2 text-gray600 hover:text-gray600/80 cursor-pointer",
                selectedCategory === category &&
                  "font-bold text-gray900 hover:text-gray900",
              )}
              onClick={() => {
                selectCategory(category);
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;
