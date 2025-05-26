"use client";
import IconButton from "../common/Button/IconButton";
import { SearchIcon } from "../common/Icons";
import MainCategoryDropdown from "../Dropdown/MainCategoryDropdown";
import useSearchbar from "./useSearchbar";

const Searchbar = () => {
  const {
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
  } = useSearchbar();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="w-full max-w-full"
    >
      <div className="relative flex gap-2">
        <MainCategoryDropdown
          selectedCategory={selectedCategory}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          selectCategory={selectCategory}
          buttonRef={buttonRef}
          dropdownRef={dropdownRef}
          buttonWidth={buttonWidth}
          showAllOption={true}
        />
        <div className="flex items-center bg-white border border-skyblue100 text-gray900 rounded-lg w-full">
          <input
            type="text"
            className="flex-1 px-4 py-2 focus:outline-none focus:ring-0"
            placeholder="검색어를 입력해주세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <IconButton
            type="submit"
            icon={<SearchIcon />}
            size="md"
            variant="icon"
            label="검색"
            isTransparent
            className="mx-2"
          />
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
