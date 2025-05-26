import { MainCategory, SubCategoryValue } from "@/types/category";
import { useLayoutEffect, useEffect, useRef, useState, RefObject } from "react";

const useSearchbar = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<MainCategory | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategoryValue | null>(null);
  const [openDropdown, setOpenDropdown] = useState<"main" | "sub" | null>(null);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const subButtonRef = useRef<HTMLButtonElement | null>(null);
  const mainDropdownRef = useRef<HTMLUListElement | null>(null);
  const subDropdownRef = useRef<HTMLUListElement | null>(null);

  const [buttonWidth, setButtonWidth] = useState(0);
  const [subButtonWidth, setSubButtonWidth] = useState(0);

  const measureButtonWidth = (
    ref: RefObject<HTMLButtonElement | null>,
    setter: (w: number) => void,
  ) => {
    if (ref.current) {
      setter(ref.current.offsetWidth);
    }
  };

  useLayoutEffect(() => {
    measureButtonWidth(buttonRef, setButtonWidth);
  }, [selectedMainCategory]);

  useLayoutEffect(() => {
    measureButtonWidth(subButtonRef, setSubButtonWidth);
  }, [selectedMainCategory, selectedMainCategory]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        subButtonRef.current?.contains(target) ||
        mainDropdownRef.current?.contains(target) ||
        subDropdownRef.current?.contains(target)
      ) {
        return;
      }
      setOpenDropdown(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectMainCategory = (category: MainCategory | null) => {
    setSelectedMainCategory(category);
    setOpenDropdown(null);
  };

  const selectSubCategory = (category: SubCategoryValue | null) => {
    setSelectedSubCategory(category);
    setOpenDropdown(null);
  };

  const handleSearch = () => {
    // TODO: 검색 화면으로 이동
    console.log(
      "keyword",
      keyword,
      "selectedCategory",
      selectedMainCategory,
      "subCategory",
      selectedSubCategory,
    );
  };

  return {
    keyword,
    setKeyword,
    selectedMainCategory,
    setSelectedMainCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    openDropdown,
    setOpenDropdown,
    selectMainCategory,
    selectSubCategory,
    handleSearch,
    buttonRef,
    subButtonRef,
    mainDropdownRef,
    subDropdownRef,
    buttonWidth,
    subButtonWidth,
  };
};

export default useSearchbar;
