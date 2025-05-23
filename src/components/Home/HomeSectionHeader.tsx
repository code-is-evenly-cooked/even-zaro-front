import { SECTION_META, SectionType } from "./SectionType";
import Link from "next/link";

interface HomeSectionHeaderProps {
  type: SectionType;
}
const HomeSectionHeader = ({ type }: HomeSectionHeaderProps) => {
  const meta = SECTION_META[type];

  return (
    <div className="flex items-center justify-between h-10">
      <div className="flex items-center justify-center gap-2">
        {meta.icon}
        <h2 className="text-xl font-bold">{meta.title}</h2>
      </div>
      <Link
        href={meta.route}
        className="flex items-center justify-center text-gray600"
      >
        <span className="text-sm">{"보러가기 >"}</span>
      </Link>
    </div>
  );
};

export default HomeSectionHeader;
