import { CommonPostItem } from "@/types/post";

const HomeSectionListItem = ({ title, createAt }: CommonPostItem) => {
  return (
    <li className="flex justify-between text-sm gap-1">
      <span className="text-gray900 line-clamp-1 whitespace-nowrap">
        {title}
      </span>
      <span className="text-gray600 whitespace-nowrap">{createAt}</span>
    </li>
  );
};

export default HomeSectionListItem;
