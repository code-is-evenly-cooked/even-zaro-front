"use client";

import { useEffect, useState } from "react";
import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";
import {
  fetchNotifications,
  markAllNotificationsAsRead,
} from "@/lib/api/notification";
import type { Notification } from "@/types/notification";
import { CATEGORY_MAP } from "@/constants/category";
import { useAuthStore } from "@/stores/useAuthStore";

export type MainCategory = keyof typeof CATEGORY_MAP;

interface NotificationModalProps {
  onClose: () => void;
}

const NotificationModal = ({ onClose }: NotificationModalProps) => {
  const { user } = useAuthStore();
  const userId = user?.userId ?? null;

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (e) {
        console.error("알림 목록 불러오기 실패", e);
      }
    };

    fetchData();
  }, [userId]);

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsAsRead();
      const updated = await fetchNotifications();
      setNotifications(updated);
    } catch (err) {
      console.error("전체 읽음 처리 실패", err);
    }
  };

  return (
    <div className="w-[420px] h-[360px] bg-white z-50 border-t border-gray-100 rounded-xl shadow-md p-1 overflow-hidden">
      <header>
        <NotificationHeader onMarkAllRead={handleMarkAllRead} />
      </header>
      <ul className="h-[310px] overflow-y-auto pt-1 pb-3">
        {notifications.map((noti) => (
          <NotificationItem
            key={noti.id}
            notification={noti}
            onClose={onClose}
          />
        ))}
      </ul>
    </div>
  );
};

export default NotificationModal;
