"use client";

import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";
import { CATEGORY_MAP } from "@/constants/category";

export type MainCategory = keyof typeof CATEGORY_MAP;

interface NotificationModalProps {
  onClose: () => void;
}

const NotificationModal = ({ onClose }: NotificationModalProps) => {
  const dummyNotifications = [
    {
      id: 5,
      type: "LIKE" as const,
      username: "아아",
      userId: 23,
      profileImage: null,
      createdAt: "2025-05-30T12:34:56",
      //   thumbnailImage: "/images/post/uuid3.png",
      isRead: true,
      category: "TOGETHER" as MainCategory,
      postId: 2,
    },
    {
      id: 4,
      type: "COMMENT" as const,
      username: "냉장고요정",
      userId: 12,
      profileImage: null,
      createdAt: "2025-05-28T12:34:56",
      comment: "이건 진짜 꿀템이네요!",
      thumbnailImage: "/images/post/uuid4.png",
      isRead: false,
      category: "TOGETHER" as MainCategory,
      postId: 2,
    },
    {
      id: 3,
      type: "LIKE" as const,
      username: "자취왕",
      userId: 9,
      profileImage: null,
      createdAt: "2025-05-21T12:34:56",
      //   thumbnailImage: "/images/post/uuid3.png",
      isRead: true,
      category: "DAILY_LIFE" as MainCategory,
      postId: 5,
    },
    {
      id: 2,
      type: "FOLLOW" as const,
      username: "맛잘알",
      userId: 5,
      profileImage: null,
      createdAt: "2025-05-21T12:34:56",
      isRead: true,
    },
    {
      id: 1,
      type: "COMMENT" as const,
      username: "혼밥천재",
      userId: 88,
      profileImage: null,
      createdAt: "2025-05-21T12:34:56",
      comment: "레시피 공유 가능할까요?",
      thumbnailImage: "2025-05-21T12:34:56",
      isRead: false,
      category: "RANDOM_BUY" as MainCategory,
      postId: 8,
    },
  ];

  return (
    <div className="w-[420px] h-[360px] bg-white z-50 border-t border-gray-100 rounded-xl shadow-md p-1 overflow-hidden">
      <header>
        <NotificationHeader />
      </header>
      <ul className="h-[310px] overflow-y-auto pt-1 pb-3">
        {dummyNotifications.map((noti) => (
          <NotificationItem
            key={noti.id}
            type={noti.type}
            username={noti.username}
            userId={noti.userId}
            profileImage={noti.profileImage}
            createdAt={noti.createdAt}
            comment={noti.comment}
            thumbnailImage={noti.thumbnailImage}
            isRead={noti.isRead}
            category={noti.category}
            postId={noti.postId}
            onClose={onClose}
          />
        ))}
      </ul>
    </div>
  );
};

export default NotificationModal;
