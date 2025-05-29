"use client";

import NotificationHeader from "./NotificationHeader";
import NotificationItem from "./NotificationItem";

const NotificationModal = () => {
  return (
    <div>
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
