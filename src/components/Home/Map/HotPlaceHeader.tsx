interface HotPlaceHeaderProps {
  activeCategory: "All" | "Cafe" | "Food" | "Etc";
  setActiveCategory: (category: "All" | "Cafe" | "Food" | "Etc") => void;
  sortType: "favorite" | "name";
  setSortType: (type: "favorite" | "name") => void;
}

export default function HotPlaceHeader({
  activeCategory,
  setActiveCategory,
  sortType,
  setSortType,
}: HotPlaceHeaderProps) {
  return (
    <div className="flex justify-between items-center px-2 gap-1">
      <div className="flex gap-2">
        {[
          { label: "전체", value: "All" },
          { label: "카페", value: "Cafe" },
          { label: "음식점", value: "Food" },
          { label: "기타", value: "Etc" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() =>
              setActiveCategory(tab.value as "All" | "Cafe" | "Food" | "Etc")
            }
            className={`px-3 py-1 rounded-full border text-sm whitespace-nowrap ${
              activeCategory === tab.value
                ? "bg-violet800 text-white"
                : "bg-white text-gray700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value as "favorite" | "name")}
        className="text-sm px-3 py-1 border rounded-md bg-white"
      >
        <option value="favorite">즐겨찾기 순</option>
        <option value="name">이름 순</option>
      </select>
    </div>
  );
}
