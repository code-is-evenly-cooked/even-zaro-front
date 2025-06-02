import { client } from "@/lib/fetch/client";
import { NotificationItem } from "@/types/notification";

export const fetchNotifications = async (): Promise<NotificationItem[]> => {
  return await client<NotificationItem[]>("/notifications", {
    method: "GET",
  });
};
