import { useEffect, useRef, useState } from "react";

const useSearchbar = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleSearch = () => {
    // TODO: 검색화면으로 이동 필요
    console.log("keyword", keyword, "selectedCategroy", selectedCategory);
  };

  return {
    keyword,
    setKeyword,
    selectedCategory,
    isDropdownOpen,
    buttonRef,
    dropdownRef,
    buttonWidth,
    toggleDropdown,
    selectCategory,
    handleSearch,
  };
};

export default useSearchbar;
