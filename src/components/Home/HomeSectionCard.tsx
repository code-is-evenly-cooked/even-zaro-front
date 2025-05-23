import React from "react";
import HomeSectionHeader from "./HomeSectionHeader";
import { SectionType } from "./SectionType";
import HomeSectionListItem from "./HomeSectionListItem";
import { CommonPostItem } from "@/types/post";

interface HomeSectionProps {
  type: SectionType;
  items: CommonPostItem[];
}

const HomeSectionCard = ({ type, items }: HomeSectionProps) => {
  return (
    <div>
      <HomeSectionHeader type={type} />
      <ul className="flex flex-col pt-3 gap-3 pl-4 pr-2">
        {items.map((item) => (
          <HomeSectionListItem
            key={item.postId}
            title={item.title}
            timeAge={item.createAt}
          />
        ))}
      </ul>
    </div>
  );
};

export default HomeSectionCard;
