"use client";

import IconButton from "@/components/common/Button/IconButton";
import { CloseIcon } from "@/components/common/Icons";
import clsx from "clsx";
import { LogoLineIcon } from "@/components/common/Icons";
import { useEffect, useState } from "react";
import SidebarButtonList from "@/components/common/SidebarButton/SidebarButtonList";
import SidebarActionButton from "@/components/common/SidebarButton/SidebarActionButton";
import { LogOut } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setVisible(false);
  };

  const handleLogout = () => {};

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-black/30 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      <aside
        className={clsx(
          "fixed top-0 left-0 h-full bg-white z-50 w-60",
          "flex flex-col justify-between",
          "transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full",
          !visible && "hidden",
        )}
        onTransitionEnd={handleAnimationEnd}
      >
        <div>
          <div className="h-[3rem] px-4 pt-2 flex justify-between items-center">
            <div className="flex justify-center items-center gap-2 text-violet800 font-bold text-lg">
              <LogoLineIcon />
              ZARO
            </div>
            <IconButton
              icon={<CloseIcon />}
              isTransparent
              label="닫기"
              onClick={onClose}
              className="sm:hidden"
            />
          </div>
          <nav className="p-4 space-y-2">
            <SidebarButtonList onItemClick={onClose} />
          </nav>
        </div>
        <div className="p-4 space-y-2">
          <ul>
						<SidebarActionButton
                icon={<LogOut size={20} />}
                title="로그아웃"
                onClick={handleLogout}
              />
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
