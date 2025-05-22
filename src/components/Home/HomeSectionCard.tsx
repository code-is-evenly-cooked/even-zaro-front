import React from "react";
import HomeSectionHeader from "./HomeSectionHeader";
import { SectionType } from "./SectionType";
import HomeSectionListItem from "./HomeSectionListItem";

export interface ListItem {
  title: string;
  timeAgo: string;
}

interface HomeSectionProps {
  type: SectionType;
  items: ListItem[];
}

const HomeSectionCard = ({ type, items }: HomeSectionProps) => {
  return (
    <div>
      <HomeSectionHeader type={type} />
      <ul className="flex flex-col pt-3 gap-3 pl-4 pr-2">
        {items.map((item, idx) => (
          <HomeSectionListItem
            key={idx}
            title={item.title}
            timeAge={item.timeAgo}
          />
        ))}
      </ul>
    </div>
  );
};

export default HomeSectionCard;
