"use client";

import { useRouter } from "next/navigation";
import type { Notification } from "@/types/notification";
import { CATEGORY_MAP } from "@/constants/category";
import { getRelativeTimeAgo } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";
import { getProfileImageUrl, getImageUrl } from "@/utils/image";
import { markNotificationAsRead } from "@/lib/api/notification";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";

export type MainCategory = keyof typeof CATEGORY_MAP;

type NotificationItemProps = {
  notification: Notification;
  onClose: () => void;
};

const NotificationItem = ({ notification, onClose }: NotificationItemProps) => {
  const router = useRouter();
  const { markAsRead } = useNotificationStore();
  const { showToastMessage } = useToastMessageContext();

  const {
    id,
    type,
    createdAt,
    actorName,
    actorId,
    actorProfileImage,
    postId,
    category,
    thumbnailImage,
    comment,
    read,
  } = notification;

  const href =
    type === "FOLLOW"
      ? `/profile/${actorId}`
      : type === "LIKE" || type === "COMMENT"
        ? `/board/${category}/${postId}`
        : undefined;

  const handleClick = async () => {
    if (!read) {
      try {
        await markNotificationAsRead(id);
        markAsRead(id);
      } catch (err) {
        console.error("알림 읽음 처리 실패", err);
      }
    }

    if (href) {
      try {
        const res = await fetch(href, { method: "HEAD" });

        if (!res.ok) throw new Error("not found");

        router.push(href);
        onClose();
      } catch {
        showToastMessage({
          type: "error",
          message:
            type === "COMMENT"
              ? "삭제 처리된 댓글입니다."
              : "삭제 처리된 게시글입니다.",
        });
      }
    }
  };

  return (
    <li
      onClick={href ? handleClick : undefined}
      className="flex items-center h-[78px] mb-1 mt-1 p-1
                hover:bg-gray-100 cursor-pointer rounded-lg transition-colors duration-150"
    >
      <div className="flex w-13 items-center ml-1 mr-1">
        {/* 읽음 표시 */}
        <span
          className={
            read
              ? "invisible w-1 h-1"
              : "inline-block w-1 h-1 rounded-full bg-purple-500"
          }
        />
        <Link href={`/profile/${actorId}`}>
          <Image
            src={getProfileImageUrl(actorProfileImage)}
            alt="프로필이미지"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover ml-2"
            onClick={(e) => e.stopPropagation()} // 클릭 전파 방지
          />
        </Link>
      </div>

      <div className="flex flex-1 items-center">
        {/* (조건부) 알림 텍스트 + 썸네일 */}
        <div className="flex items-center ml-2 mr-2">
          <div>
            <Link
              href={`/profile/${actorId}`}
              className="font-semibold text-gray-600 hover:font-bold"
              onClick={(e) => e.stopPropagation()} // 클릭 전파 방지
            >
              {actorName}
            </Link>
            {type === "LIKE" && (
              <span className="text-gray-700">
                님이 회원님의 게시글을 좋아합니다.
              </span>
            )}
            {type === "FOLLOW" && (
              <span className="text-gray-700">
                님이 회원님을 팔로우하기 시작했습니다.
              </span>
            )}
            {type === "COMMENT" && (
              <>
                <span className="text-gray-700">
                  님이 댓글을 남겼습니다. :{" "}
                </span>
                <span className="text-gray-700">{comment}</span>
              </>
            )}
            <span className="font-light text-gray-400">
              {" "}
              {getRelativeTimeAgo(createdAt)}
            </span>
          </div>
          {/* 게시물 썸네일 img (게시물 좋아요일 때만 + 썸네일이 존재할 때만) */}
          {type === "LIKE" && thumbnailImage && (
            <Image
              src={getImageUrl(thumbnailImage)}
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
};

export default NotificationItem;
