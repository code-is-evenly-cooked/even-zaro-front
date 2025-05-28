"use client";

import { CATEGORY_MAP } from "@/constants/category";
import { MainCategory, SubCategoryValue } from "@/types/category";
import clsx from "clsx";

interface SubCategoryFilterProps {
  mainCategory: MainCategory;
  selected: SubCategoryValue | null;
  onSelect: (tag: SubCategoryValue | null) => void;
}

const SubCategoryFilter = ({
  mainCategory,
  selected,
  onSelect,
}: SubCategoryFilterProps) => {
  const subCategories = CATEGORY_MAP[mainCategory].options;

  return (
    <div className="flex gap-2 items-start justify-start flex-wrap">
      <button
        onClick={() => onSelect(null)}
        className={clsx(
          "px-3 py-2.5 rounded-lg text-md",
          selected === null
            ? "bg-violet800 text-white"
            : "bg-gray100 font-normal text-gray900",
        )}
      >
        전체
      </button>
      {subCategories.map(({ tag, label, emoji }) => (
        <button
          key={tag}
          className={clsx(
            "px-3 py-2.5 rounded-lg text-md",
            selected === tag
              ? "bg-violet800 text-white"
              : "bg-gray100 font-normal text-gray900",
          )}
          onClick={() => onSelect(tag)}
        >
          {emoji} {label}
        </button>
      ))}
    </div>
  );
};

export default SubCategoryFilter;
