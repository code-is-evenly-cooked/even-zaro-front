"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogIn, MenuIcon, ArrowLeftIcon } from "lucide-react";

import IconButton from "@/components/common/Button/IconButton";
import { LogoLineIcon, SearchIcon } from "@/components/common/Icons";
import NotificationButton from "@/components/notification/NotificationButton";
import Searchbar from "@/components/Searchbar/Searchbar";
import { useAuthStore } from "@/stores/useAuthStore";
import { getProfileImageUrl } from "@/utils/image";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const pathname = usePathname();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { user } = useAuthStore();

  // 검색창 숨김 경로 시작
  const hideSearchbarRoutes = [
    "/board",
    "/editor",
    "/search",
    "/profile",
    "/setting",
    "/report",
  ];
  const shouldHideSearchbar = hideSearchbarRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // 검색 창 md 사이즈 이후 resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="relative h-12 min-h-12 flex items-center justify-between px-2">
      {/* 왼쪽 영역: 메뉴 + 로고 */}
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

      {/* 가운데: md 이상에서 중앙 정렬된 Searchbar */}
      {!isMobileSearchOpen && !shouldHideSearchbar && (
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-full max-w-md z-10">
          <Searchbar />
        </div>
      )}

      {/* 모바일 검색 모드 */}
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
        // 오른쪽 영역: 검색 아이콘 + 알림 + 로그인 or 프로필
        <div className="flex items-center gap-2">
          {!shouldHideSearchbar && (
            <div className="md:hidden">
              <IconButton
                icon={<SearchIcon />}
                isTransparent
                label="검색"
                onClick={() => setIsMobileSearchOpen(true)}
              />
            </div>
          )}
          <NotificationButton />
          {user?.userId ? (
            <Link href={`/profile/${user.userId}`}>
              <Image
                src={getProfileImageUrl(user.profileImage)}
                alt="프로필 이미지"
                width={28}
                height={28}
                className="rounded-full object-cover"
              />
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
