import IconButton from "../common/Button/IconButton";
import { RightArrowIcon } from "../common/Icons";
import CategoryDropdown from "../Dropdown/CategoryDropdown";
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
      <div className="relative flex gap-4" ref={dropdownRef}>
        <CategoryDropdown
          selectedCategory={selectedCategory}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          selectCategory={selectCategory}
          buttonRef={buttonRef}
          buttonWidth={buttonWidth}
        />
        <div className="flex items-center bg-white border border-skyblue100 text-gray900 rounded-lg w-full">
          <input
            type="text"
            className="flex-1 p-2 focus:outline-none focus:ring-0"
            placeholder="검색어를 입력해주세요."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <IconButton
            type="submit"
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
