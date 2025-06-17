import { CommonPostItem } from "@/types/post";

const HomeSectionListItem = ({ title, createdAt }: CommonPostItem) => {
  return (
    <div className="flex justify-between text-sm gap-1 py-1.5 pl-4 pr-2 rounded-sm hover:bg-gray200/50">
      <span className="text-gray900 line-clamp-1 whitespace-nowrap hover:underline">
        {title}
      </span>
      <span className="text-gray600 whitespace-nowrap">{createdAt}</span>
    </div>
  );
};

export default HomeSectionListItem;
