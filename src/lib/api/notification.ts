import { client } from "@/lib/fetch/client";
import { Notification } from "@/types/notification";

export const fetchNotifications = async (): Promise<Notification[]> => {
  return await client<Notification[]>("/notifications", {
    method: "GET",
  });
};
