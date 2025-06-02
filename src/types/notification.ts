export type NotificationType = "LIKE" | "FOLLOW" | "COMMENT";

export interface NotificationItem {
  id: number;
  type: NotificationType;
  targetId: number;
  createdAt: string;
  userId: number;
  username: string;
  profileImage: string | null;
  category: string | null;
  thumbnailImage: string | null;
  comment: string | null;
  read: boolean;
}
