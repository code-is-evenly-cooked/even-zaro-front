"use client";

import { RefObject } from "react";
import SubCategoryDropdown from "../Dropdown/SubCategoryDropdown";
import { MainCategory, SubCategoryValue } from "@/types/category";

interface EditorHeaderProps {
  mainCategory: MainCategory | null;
  subCategory: SubCategoryValue | null;
  setSubCategory: (tag: SubCategoryValue) => void;
  openDropdown: "sub" | null;
  setOpenDropdown: React.Dispatch<React.SetStateAction<"sub" | null>>;
  subButtonRef: RefObject<HTMLButtonElement | null>;
  subDropdownRef: RefObject<HTMLUListElement | null>;
  subButtonWidth: number;
}

export default function EditorHeader({
  mainCategory,
  subCategory,
  setSubCategory,
  openDropdown,
  setOpenDropdown,
  subButtonRef,
  subDropdownRef,
  subButtonWidth,
}: EditorHeaderProps) {
  if (!mainCategory) return null;

  return (
    <div className="flex justify-between items-center">
      <div className="my-4 flex gap-2 items-center">
        <SubCategoryDropdown
          selectedMainCategory={mainCategory}
          selectedSubCategory={subCategory}
          isDropdownOpen={openDropdown === "sub"}
          toggleDropdown={() =>
            setOpenDropdown((prev) => (prev === "sub" ? null : "sub"))
          }
          selectSubCategory={(tag) => {
            if (!tag) return;
            setSubCategory(tag);
            setOpenDropdown(null);
          }}
          buttonRef={subButtonRef}
          dropdownRef={subDropdownRef}
          buttonWidth={subButtonWidth}
          showAllOption={false}
        />
      </div>
    </div>
  );
}
