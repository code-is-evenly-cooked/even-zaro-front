import { CATEGORY_MAP } from "@/constants/category";
import { MainCategory } from "@/types/category";
import Link from "next/link";

interface HomeSectionHeaderProps {
  category: MainCategory;
}
const HomeSectionHeader = ({ category }: HomeSectionHeaderProps) => {
  const meta = CATEGORY_MAP[category];

  return (
    <div className="flex items-center justify-between h-10">
      <div className="flex items-center justify-center gap-2">
        {meta.icon}
        <h2 className="text-xl font-bold">{meta.title}</h2>
      </div>
      <Link
        href={`/board/${category}`}
        className="flex items-center justify-center text-gray600"
      >
        <span className="text-xs">{"보러가기 >"}</span>
      </Link>
    </div>
  );
};

export default HomeSectionHeader;
