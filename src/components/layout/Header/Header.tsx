"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogIn, MenuIcon, ArrowLeftIcon } from "lucide-react";

import IconButton from "@/components/common/Button/IconButton";
import {
  LogoLineIcon,
  NotificationIcon,
  SearchIcon,
} from "@/components/common/Icons";
import Searchbar from "@/components/Searchbar/Searchbar";
import NotificationModal from "@/components/notification/NotificationModal";
import { useAuthStore } from "@/stores/useAuthStore";
import { getProfileImageUrl } from "@/utils/image";
import useSse from "@/hooks/useSse";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const pathname = usePathname();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { user } = useAuthStore();

  // 숨길 전체 헤더 경로
  const hideHeaderRoutes = [
    "/login",
    "/signup",
    "/password-forget",
    "/password-reset",
    "/email-validation",
    "/policy/terms",
    "/policy/privacy",
    "/map",
  ];

  // 검색창 숨김 경로 시작
  const hideSearchbarRoutes = ["/board", "/editor", "/search"];
  const shouldHideSearchbar = hideSearchbarRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // SSE 연결 시도
  useSse();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isNotificationOpen &&
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotificationOpen]);

  if (hideHeaderRoutes.includes(pathname)) return null;

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
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-full max-w-md">
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
          <IconButton
            icon={<NotificationIcon className="w-6 h-6" />}
            isTransparent
            label="알림"
            onClick={() => setIsNotificationOpen((prev) => !prev)}
          />
          <div className="relative">
            {isNotificationOpen && (
              <div
                ref={notificationRef}
                className="absolute top-full right-0 mt-6 z-50"
              >
                <NotificationModal
                  onClose={() => setIsNotificationOpen(false)}
                />
              </div>
            )}
          </div>
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
