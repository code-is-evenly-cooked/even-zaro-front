"use client";

const NotificationItem = () => {
  return (
    <div>
      {/* 읽음표시 img */}
      <img />
      <div>
        {/* 알림액션 한 상대유저의 프로필이미지 */}
        <img />
        <div>
          <div>
            <span>알림 내용</span>
            <span>알림 생성 시각</span>
          </div>
          {/* 게시물 썸네일 img (게시물 좋아요일때만) */}
          <img />
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
