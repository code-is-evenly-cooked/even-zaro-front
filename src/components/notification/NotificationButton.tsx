"use client";

import { useRef, useState, useEffect } from "react";
import IconButton from "@/components/common/Button/IconButton";
import NotificationModal from "@/components/notification/NotificationModal";
import { NotificationIcon } from "@/components/common/Icons";
import { fetchNotifications } from "@/lib/api/notification";

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNotifications();
        const unread = data.filter((n) => !n.read).length;
        setUnreadCount(unread);
      } catch (e) {
        console.error("안 읽은 알림 개수 불러오기 실패", e);
      }
    };
    fetchData();
  }, []);

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
      {isOpen && (
        <div className="absolute top-full right-0 mt-6 z-50">
          <NotificationModal onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
