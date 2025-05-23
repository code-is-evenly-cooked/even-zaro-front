"use client";

import { CATEGORY_MAP } from "@/constants/category";
import { MainCategory, SubCategoryValue } from "@/types/category";
import clsx from "clsx";

interface SubCategoryFilterProps {
  mainCategory: MainCategory;
  selected: SubCategoryValue | "전체";
  onSelect: (value: SubCategoryValue | "전체") => void;
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
        onClick={() => onSelect("전체")}
        className={clsx(
          "px-3 py-1.5 rounded-lg text-sm gray900",
          selected === "전체"
            ? "bg-skyblue300 font-bold"
            : "bg-skyblue100 font-normal",
        )}
      >
        전체
      </button>
      {subCategories.map(({ tag, label, emoji }) => (
        <button
          key={tag}
          className={clsx(
            "px-3 py-1.5 rounded-lg text-sm gray900",
            selected === tag
              ? "bg-skyblue300 font-bold"
              : "bg-skyblue100 font-normal",
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
