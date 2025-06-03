"use client";

import { useRef, useState, useEffect } from "react";
import IconButton from "@/components/common/Button/IconButton";
import NotificationModal from "@/components/notification/NotificationModal";
import { NotificationIcon } from "@/components/common/Icons";
import { fetchNotifications } from "@/lib/api/notification";
import { useNotificationStore } from "@/stores/useNotificationStore";
import useSse from "@/hooks/useSse";

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { unreadCount, setNotifications } = useNotificationStore();

  useSse();

  useEffect(() => {
    fetchNotifications()
      .then(setNotifications)
      .catch((e) => {
        console.error("알림 데이터 가져오기 실패", e);
      });
  }, [setNotifications]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={ref}>
      <IconButton
        icon={<NotificationIcon className="w-6 h-6" />}
        isTransparent
        label="알림"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
      {isOpen && (
        <div className="absolute top-full right-0 mt-6 z-50">
          <NotificationModal onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
