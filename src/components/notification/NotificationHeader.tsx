"use client";

interface NotificationHeaderProps {
  onMarkAllRead: () => void;
}

const NotificationHeader = ({ onMarkAllRead }: NotificationHeaderProps) => {
  return (
    <div className="flex items-center justify-between h-[50px] px-4 py-2 border-b border-gray-200">
      <span className="text-base ml-1 pt-2">알림</span>
      <button
        className="text-sm font-semibold text-gray-400 hover:text-gray-400/80 pt-2 mr-1"
        onClick={onMarkAllRead}
      >
        전체 읽기
      </button>
    </div>
  );
};

export default NotificationHeader;
