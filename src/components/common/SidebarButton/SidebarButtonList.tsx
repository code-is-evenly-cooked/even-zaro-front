import React from "react";
import {
  HomeIcon,
  LocationIcon,
  ShoppingBagIcon,
  TipIcon,
  TogetherIcon,
} from "../Icons";
import SidebarButton from "./SidebarButton";

const buttons = [
  { title: "홈", icon: <HomeIcon />, href: "/" },
  { title: "같이 쓰자", icon: <TogetherIcon />, href: "/board/TOGETHER" },
  { title: "자취 일상", icon: <TipIcon />, href: "/board/DAILY_LIFE" },
  { title: "텅장 일기", icon: <ShoppingBagIcon />, href: "/board/RANDOM_BUY" },
  { title: "동네 탐방", icon: <LocationIcon />, href: "/map" },
];

interface SidebarButtonListProps {
  onItemClick: () => void;
}

const SidebarButtonList = ({ onItemClick }: SidebarButtonListProps) => {
  return (
    <ul>
      {buttons.map((button) => (
        <SidebarButton key={button.title} {...button} onClick={onItemClick} />
      ))}
    </ul>
  );
};

export default SidebarButtonList;
