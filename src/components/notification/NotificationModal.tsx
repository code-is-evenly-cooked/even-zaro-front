"use client";

import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";

const NotificationModal = () => {
  const dummyNotifications = [
    {
      id: 5,
      type: "LIKE" as const,
      username: "아아",
      createdAt: "1분 전",
      //   thumbnailImage: "/images/post/uuid3.png",
      isRead: true,
    },
    {
      id: 4,
      type: "COMMENT" as const,
      username: "냉장고요정",
      createdAt: "3분 전",
      comment: "이건 진짜 꿀템이네요!",
      thumbnailImage: "/images/post/uuid4.png",
      isRead: false,
    },
    {
      id: 3,
      type: "LIKE" as const,
      username: "자취왕",
      createdAt: "7분 전",
      //   thumbnailImage: "/images/post/uuid3.png",
      isRead: true,
    },
    {
      id: 2,
      type: "FOLLOW" as const,
      username: "맛잘알",
      createdAt: "15분 전",
      isRead: true,
    },
    {
      id: 1,
      type: "COMMENT" as const,
      username: "혼밥천재",
      createdAt: "30분 전",
      comment: "레시피 공유 가능할까요?",
      thumbnailImage: "/images/post/uuid1.png",
      isRead: false,
    },
  ];

  return (
    <div className="w-[420px] h-[360px] bg-white z-50 border-t border-gray-100 rounded-xl shadow-md p-1 overflow-hidden">
      <header>
        <NotificationHeader />
      </header>
      <div className="h-[310px] overflow-y-auto pt-1 pb-3">
        {dummyNotifications.map((noti) => (
          <NotificationItem
            key={noti.id}
            type={noti.type}
            username={noti.username}
            createdAt={noti.createdAt}
            comment={noti.comment}
            thumbnailImage={noti.thumbnailImage}
            isRead={noti.isRead}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationModal;
