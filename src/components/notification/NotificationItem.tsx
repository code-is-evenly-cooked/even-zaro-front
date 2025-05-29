"use client";

type NotificationItemProps = {
  type: "LIKE" | "FOLLOW" | "COMMENT";
  username: string;
  createdAt: string;
  comment?: string;
  thumbnailImage?: string;
};

const NotificationItem = ({
  type,
  username,
  createdAt,
  comment,
  thumbnailImage,
}: NotificationItemProps) => {
  return (
    <div className="flex">
      {/* 읽음표시 img */}
      <img alt="읽 " />

      <div className="flex">
        {/* 알림액션 한 상대유저의 프로필이미지 */}
        <img
          src="/icons/defaultProfile.svg"
          alt="프로필이미지"
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* (조건부) 알림 텍스트 + 썸네일 */}
        <div className="flex">
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
            <span> {createdAt}</span>
          </div>
          {/* 게시물 썸네일 img (게시물 좋아요일때만) */}
          {type === "LIKE" && (
            <img
              src={thumbnailImage || "/icons/placeholderImage.svg"}
              alt="썸네일 이미지"
              className="w-16 h-16 object-cover rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
