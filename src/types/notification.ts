import type { MainCategory } from "@/components/notification/NotificationModal";

export type NotificationType = "LIKE" | "FOLLOW" | "COMMENT";

export interface Notification {
  id: number;
  type: NotificationType;
  targetId: number;
  createdAt: string;
  actorId: number;
  actorName: string;
  actorProfileImage: string | null;
  postId: number | null;
  category: MainCategory | null;
  thumbnailImage: string | null;
  comment: string | null;
  read: boolean;
}
