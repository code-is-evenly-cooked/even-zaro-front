"use client";

const NotificationHeader = () => {
  return (
    <div className="flex items-center justify-between h-[50px] px-4 py-2 border-b border-gray-200">
      <span>알림</span>
      <button>전체 읽기</button>
    </div>
  );
};

export default NotificationHeader;
