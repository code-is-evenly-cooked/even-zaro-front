"use client";

import type { NotificationType } from "@/types/notification";
import { getRelativeTimeAgo } from "@/utils/date";
import Image from "next/image";

type NotificationItemProps = {
  type: NotificationType;
  username: string;
  createdAt: string;
  comment?: string;
  thumbnailImage?: string;
  isRead: boolean;
};

const NotificationItem = ({
  type,
  username,
  createdAt,
  comment,
  thumbnailImage,
  isRead,
}: NotificationItemProps) => {
  return (
    <div className="flex items-center h-[78px] mb-1 mt-1">
      {/* 읽음표시 img */}
      <span
        className="inline-block ml-2 mr-2 w-1 h-1 rounded-full bg-purple-500"
        style={{ visibility: isRead ? "hidden" : "visible" }}
      />

      <div className="flex items-center">
        {/* 알림액션 한 상대유저의 프로필이미지 */}
        <Image
          src="/icons/defaultProfile.svg"
          alt="프로필이미지"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* (조건부) 알림 텍스트 + 썸네일 */}
        <div className="flex items-center ml-2 mr-2">
          <div>
            <span>{username}</span>
            {type === "LIKE" && (
              <span> 님이 회원님의 게시글을 좋아합니다.</span>
            )}
            {type === "FOLLOW" && (
              <span> 님이 회원님을 팔로우하기 시작했습니다.</span>
            )}
            {type === "COMMENT" && (
              <>
                <span> 님이 댓글을 남겼습니다. : </span>
                <span>{comment}</span>
              </>
            )}
            <span> {getRelativeTimeAgo(createdAt)}</span>
          </div>
          {/* 게시물 썸네일 img (게시물 좋아요일때만) */}
          {type === "LIKE" && (
            <Image
              src={thumbnailImage || "/icons/placeholderImage.svg"}
              alt="썸네일 이미지"
              width={56}
              height={56}
              className="w-14 h-14 object-cover rounded ml-2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
