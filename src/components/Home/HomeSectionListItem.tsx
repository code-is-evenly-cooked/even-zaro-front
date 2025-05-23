import { CommonPostItem } from "@/types/post";

const HomeSectionListItem = ({ title, createAt }: CommonPostItem) => {
  return (
    <li className="flex justify-between text-sm">
      <span className="text-gray900">{title}</span>
      <span className="text-gray600">{createAt}</span>
    </li>
  );
};

export default HomeSectionListItem;
