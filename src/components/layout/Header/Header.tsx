import IconButton from "@/components/common/Button/IconButton";
import {
  HomeIcon,
  SearchIcon,
  NotificationIcon,
} from "@/components/common/Icons";
import Searchbar from "@/components/Searchbar/Searchbar";
import { LogIn, MenuIcon } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  onLoginClick: () => void;
}

const Header = ({ onMenuClick, onLoginClick }: HeaderProps) => {
  return (
    <header className="h-[3rem] px-12 flex items-center justify-between">
      <div className="flex items-center text-violet800 font-bold text-lg gap-4">
        <IconButton
          icon={<MenuIcon />}
          isTransparent
          label="메뉴"
          onClick={onMenuClick}
        />
        <div className="flex items-center gap-2">
          <HomeIcon />
          ZARO
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Searchbar />
        <IconButton icon={<SearchIcon />} isTransparent label="검색" />
        <IconButton icon={<NotificationIcon />} isTransparent label="알림" />
        <IconButton
          icon={<LogIn />}
          isTransparent
          label="로그인"
          onClick={onLoginClick}
        />
      </div>
    </header>
  );
};

export default Header;
