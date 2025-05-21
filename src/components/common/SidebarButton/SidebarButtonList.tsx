import React from "react";
import { HomeIcon, ShoppingBagIcon, TipIcon, TogetherIcon } from "../Icons";
import SidebarButton from "./SidebarButton";

// TODO: 홈 외 링크 추가 필요
const buttons = [
  { title: "홈", icon: <HomeIcon />, href: "/" },
  { title: "같이 쓰자", icon: <TogetherIcon />, href: "/" },
  { title: "자취 꿀팁", icon: <TipIcon />, href: "/" },
  { title: "아무거나 샀어요", icon: <ShoppingBagIcon />, href: "/" },
];

interface SidebarButtonListProps {
  onItemClick: () => void;
}

const SidebarButtonList = ({ onItemClick }: SidebarButtonListProps) => {
  return (
    <div>
      {buttons.map((button) => (
        <SidebarButton key={button.title} {...button} onClick={onItemClick} />
      ))}
    </div>
  );
};

export default SidebarButtonList;
