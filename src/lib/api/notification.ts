import { client } from "@/lib/fetch/client";
import { Notification } from "@/types/notification";

export const fetchNotifications = async (): Promise<Notification[]> => {
  return await client<Notification[]>("/notifications", {
    method: "GET",
  });
};

export const markNotificationAsRead = async (notificationId: number) => {
  await client(`/notifications/${notificationId}`, {
    method: "PATCH",
  });
};

export const markAllNotificationsAsRead = async () => {
  return await client("/notifications/bulk", {
    method: "PATCH",
  });
};
