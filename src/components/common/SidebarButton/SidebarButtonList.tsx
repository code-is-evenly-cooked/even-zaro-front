import React from "react";
import { HomeIcon, ShoppingBagIcon, TipIcon, TogetherIcon } from "../Icons";
import SidebarButton from "./SidebarButton";

const buttons = [
  { title: "홈", icon: <HomeIcon />, href: "/" },
  { title: "같이 쓰자", icon: <TogetherIcon />, href: "/" },
  { title: "자취 꿀팁", icon: <TipIcon />, href: "/" },
  { title: "아무거나 샀어요", icon: <ShoppingBagIcon />, href: "/" },
];

const SidebarButtonList = () => {
  return (
    <div>
      {buttons.map((button) => (
        <SidebarButton key={button.title} {...button} />
      ))}
    </div>
  );
};

export default SidebarButtonList;
