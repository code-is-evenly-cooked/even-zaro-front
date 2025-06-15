import { client } from "@/lib/fetch/client";
import { Notification } from "@/types/notification";
import { useAuthStore } from "@/stores/useAuthStore";

export const fetchNotifications = async (): Promise<Notification[]> => {
  const { accessToken } = useAuthStore.getState();
  return await client<Notification[]>("/notifications", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const markNotificationAsRead = async (notificationId: number) => {
  const { accessToken } = useAuthStore.getState();
  await client(`/notifications/${notificationId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const markAllNotificationsAsRead = async () => {
  const { accessToken } = useAuthStore.getState();
  return await client("/notifications/bulk", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
