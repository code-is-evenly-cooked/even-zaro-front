"use client";

import type { NotificationType } from "@/types/notification";
import { CATEGORY_MAP } from "@/constants/category";
import { getRelativeTimeAgo } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";

export type MainCategory = keyof typeof CATEGORY_MAP;

type NotificationItemProps = {
  type: NotificationType;
  username: string;
  userId: number;
  createdAt: string;
  comment?: string;
  thumbnailImage?: string;
  isRead: boolean;
  category?: MainCategory;
  postId?: number;
  onClose: () => void;
};

const NotificationItem = ({
  type,
  username,
  userId,
  createdAt,
  comment,
  thumbnailImage,
  isRead,
  category,
  postId,
  onClose,
}: NotificationItemProps) => {
  const href =
    type === "FOLLOW"
      ? `/profile/${userId}`
      : type === "LIKE" || type === "COMMENT"
        ? `/board/${category}/${postId}`
        : undefined;

  const itemContent = (
    <li
      className="flex items-center h-[78px] mb-1 mt-1 p-1
                hover:bg-gray-100 cursor-pointer rounded-lg transition-colors duration-150"
    >
      <div className="flex items-center ml-1 mr-2">
        {/* 읽음 표시 */}
        <span
          className={
            isRead
              ? "invisible w-1 h-1"
              : "inline-block w-1 h-1 rounded-full bg-purple-500"
          }
        />
        <Link href={`/profile/${userId}`}>
          <Image
            src="/icons/defaultProfile.svg"
            alt="프로필이미지"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover ml-2"
          />
        </Link>
      </div>

      <div className="flex items-center">
        {/* (조건부) 알림 텍스트 + 썸네일 */}
        <div className="flex items-center ml-2 mr-2">
          <div>
            <Link
              href={`/profile/${userId}`}
              className="font-semibold text-gray-600 hover:font-bold"
            >
              {username}
            </Link>
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
            <span className="font-light text-gray-400">
              {" "}
              {getRelativeTimeAgo(createdAt)}
            </span>
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
    </li>
  );

  return href ? (
    <Link href={href} onClick={onClose}>
      {itemContent}
    </Link>
  ) : (
    itemContent
  );
};

export default NotificationItem;
