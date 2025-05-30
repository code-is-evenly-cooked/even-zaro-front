import { ProfileTabType } from "@/types/profile";

interface Props {
  activeTab: ProfileTabType;
  onTabChange: (tab: ProfileTabType) => void;
}

export default function ProfileTabs({ activeTab, onTabChange }: Props) {
  const tabs: { label: string; key: ProfileTabType }[] = [
    { key: "posts", label: "내가 쓴 글" },
    { key: "comments", label: "내 댓글" },
    { key: "likes", label: "좋아요" },
    { key: "bookmarks", label: "즐겨찾기" },
  ];

  return (
    <div className="mt-3 mb-6">
      <ul className="flex justify-around text-sm text-gray-500">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <button
              onClick={() => onTabChange(tab.key)}
              className={`py-2 ${
                activeTab === tab.key
                  ? "text-black font-semibold border-b-2 border-black"
                  : "hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
