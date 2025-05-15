import { ChevronDown } from "lucide-react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import IconButton from "../common/Button/IconButton";
import { RightArrowIcon } from "../common/Icons";
import { MAIN_CATEGORIES } from "@/constants/categories";
import clsx from "clsx";

const Searchbar = () => {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonwidth, setButtonWidth] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("keyword", keyword, "selectedCategroy", selectedCategory);
  };

  useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [selectedCategory]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[50vw]">
      <div className="relative flex gap-4">
        <button
          ref={buttonRef}
          type="button"
          className="flex items-center bg-skyblue300 text-gray600 py-2 pl-3 pr-2 rounded-lg"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          {selectedCategory}
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
        {isDropdownOpen && (
          <ul
            className="absolute z-10 top-full mt-2 w-max bg-skyblue300 rounded-lg p-2 shadow-md text-gray900"
            style={{ minWidth: buttonwidth }}
          >
            <li
              key="전체"
              className={clsx(
                "px-2 text-gray600 hover:text-gray600/80 cursor-pointer",
                selectedCategory === "전체" &&
                  "font-bold text-gray900 hover:text-gray900",
              )}
              onClick={() => {
                setSelectedCategory("전체");
                setIsDropdownOpen(false);
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
                  setSelectedCategory(category);
                  setIsDropdownOpen(false);
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
        <div className="flex items-center bg-white border border-skyblue100 text-gray900 rounded-lg">
          <input
            type="text"
            className="p-2 focus:outline-none focus:ring-0"
            placeholder="검색어를 입력해주세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <IconButton
            icon={<RightArrowIcon />}
            size="md"
            color="skyblue300"
            label="검색"
            className="mr-2"
          />
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
