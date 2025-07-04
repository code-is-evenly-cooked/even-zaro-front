"use client";

import IconButton from "@/components/common/Button/IconButton";
import { CloseIcon } from "@/components/common/Icons";
import clsx from "clsx";
import { LogoLineIcon } from "@/components/common/Icons";
import { useEffect, useState } from "react";
import SidebarButtonList from "@/components/common/SidebarButton/SidebarButtonList";
import { LogIn, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import SidebarButton from "@/components/common/SidebarButton/SidebarButton";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { useLogout } from "@/hooks/useUser";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [visible, setVisible] = useState(isOpen);
  const { user } = useAuthStore();
  const { showToastMessage } = useToastMessageContext();
  const { logout } = useLogout();

  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setVisible(false);
  };

  const handleLogout = async () => {
    try {
      await logout("/login");
    } catch (error) {
      console.log(error);
      showToastMessage({
        type: "error",
        message: "로그아웃에 실패했습니다. 다시 시도해주세요.",
      });
      return;
    }
  };

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
            {user ? (
              <SidebarButton
                icon={<LogOut size={20} />}
                title="로그아웃"
                onClick={handleLogout}
              />
            ) : (
              <SidebarButton
                icon={<LogIn size={20} />}
                title="로그인"
                href="/login"
                onClick={onClose}
              />
            )}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
