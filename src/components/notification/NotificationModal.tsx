"use client";

import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";

const NotificationModal = () => {
  return (
    <div className="w-[360px] h-[360px] bg-white z-50 border border-gray-200">
      <header>
        <NotificationHeader />
      </header>
      <div>
        {/* map으로 돌려야함 */}
        <NotificationItem />
      </div>
    </div>
  );
};

export default NotificationModal;
