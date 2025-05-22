"use client";

import IconButton from "@/components/common/Button/IconButton";
import {
  LogoLineIcon,
  SearchIcon,
  NotificationIcon,
  DefaultProfileIcon,
} from "@/components/common/Icons";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useAuthStore } from "@/stores/useAuthStore";
import { ArrowLeftIcon, LogIn, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const pathname = usePathname();
  const hideHeaderRoutes = [
    "/login",
    "/signup",
    "/password-forget",
    "/password-reset",
    "/email-validation",
  ];
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { user } = useAuthStore();

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

  if (hideHeaderRoutes.includes(pathname)) return null;

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
            <LogoLineIcon />
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
          {user?.userId ? (
            <Link href={`/profile/${user.userId}`}>
              {user.profileImageUrl ? (
                <Image
                  src={user.profileImageUrl}
                  alt="프로필 이미지"
                  width={28}
                  height={28}
                />
              ) : (
                <DefaultProfileIcon className="rounded-full object-cover" />
              )}
            </Link>
          ) : (
            <Link href="/login">
              <IconButton icon={<LogIn />} isTransparent label="로그인" />
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
