"use client";

type NotificationType = "LIKE" | "FOLLOW" | "COMMENT";

const NotificationItem = ({ type }: { type: NotificationType }) => {
  return (
    <div className="flex">
      {/* 읽음표시 img */}
      <img />
      <div>
        {/* 알림액션 한 상대유저의 프로필이미지 */}
        <img alt="프로필이미지" />

        {/* (조건부) 알림 텍스트 + 썸네일 */}
        <div className="flex">
          <div>
            <span>상대유저</span>
            {type === "LIKE" && (
              <span> 님이 회원님의 게시글을 좋아합니다.</span>
            )}
            {type === "FOLLOW" && (
              <span> 님이 회원님을 팔로우하기 시작했습니다.</span>
            )}
            {type === "COMMENT" && (
              <>
                <span> 님이 댓글을 남겼습니다. : </span>
                <span>와 자취꿀템 인정 ~ </span>
              </>
            )}
            <span> 5분 전</span>
          </div>
          {/* 게시물 썸네일 img (게시물 좋아요일때만) */}
          {type === "LIKE" && <img alt="썸네일이미지" />}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
