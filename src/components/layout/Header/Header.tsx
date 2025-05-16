import IconButton from "@/components/common/Button/IconButton";
import {
  HomeIcon,
  SearchIcon,
  NotificationIcon,
} from "@/components/common/Icons";
import Searchbar from "@/components/Searchbar/Searchbar";
import { ArrowLeftIcon, LogIn, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  onMenuClick: () => void;
  onLoginClick: () => void;
}

const Header = ({ onMenuClick, onLoginClick }: HeaderProps) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // md 이상일 경우 모바일 검색모드 자동해제
      if (window.innerWidth >= 428) {
        setIsMobileSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="h-[3rem] px-4 sm:px-10 flex items-center justify-between">
      {!isMobileSearchOpen && (
        <div className="flex items-center text-violet800 font-bold text-lg gap-2">
          <IconButton
            icon={<MenuIcon />}
            isTransparent
            label="메뉴"
            onClick={onMenuClick}
          />
          <Link href="/" className="flex items-center gap-2">
            <HomeIcon />
            ZARO
          </Link>
        </div>
      )}

      {isMobileSearchOpen ? (
        <div className="flex justify-center items-center gap-2 w-full">
          <div className="shrink-0">
            <IconButton
              icon={<ArrowLeftIcon />}
              isTransparent
              label="뒤로가기"
              onClick={() => setIsMobileSearchOpen(false)}
            />
          </div>
          <div className="w-full">
            <Searchbar />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <div className="hidden sm:block">
            <Searchbar />
          </div>
          <div className="sm:hidden">
            <IconButton
              icon={<SearchIcon />}
              isTransparent
              label="검색"
              onClick={() => setIsMobileSearchOpen(true)}
            />
          </div>
          <IconButton icon={<NotificationIcon />} isTransparent label="알림" />
          <IconButton
            icon={<LogIn />}
            isTransparent
            label="로그인"
            onClick={onLoginClick}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
