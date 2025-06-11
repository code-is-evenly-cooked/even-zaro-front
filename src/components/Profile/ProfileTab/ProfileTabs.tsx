import { ProfileTabType } from "@/types/profile";

interface Props {
  activeTab: ProfileTabType;
  onTabChange: (tab: ProfileTabType) => void;
}

export default function ProfileTabs({ activeTab, onTabChange }: Props) {
  const tabs: { label: string; key: ProfileTabType }[] = [
    { key: "posts", label: "작성한 글" },
    { key: "comments", label: "작성한 댓글" },
    { key: "likes", label: "좋아요한 글" },
    { key: "favorites", label: "즐겨찾기" },
  ];

  return (
    <ul className="flex justify-around text-sm text-gray600 mt-3 mb-6">
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
  );
}
