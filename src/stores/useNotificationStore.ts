import { create } from "zustand";
import type { Notification } from "@/types/notification";

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  setNotifications: (notis: Notification[]) => void;
  markAsRead: (id: number) => void;
  addNotification: (noti: Notification) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  setNotifications: (notis) =>
    set({
      notifications: notis,
      unreadCount: notis.filter((n) => !n.read).length,
    }),
  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),
  addNotification: (noti) =>
    set((state) => {
      const updated = [noti, ...state.notifications];
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),
}));
