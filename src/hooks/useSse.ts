import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNotificationStore } from "@/stores/useNotificationStore";
import type { Notification } from "@/types/notification";

const useSse = () => {
  const { user } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!user?.userId) return;

    // 이전 연결 종료 (로그인 완료 감지 시 재연결)
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/subscribe`,
      { withCredentials: true },
    );

    eventSource.addEventListener("notification", (event) => {
      const data: Notification = JSON.parse(event.data);
      console.log("📢 알림 도착!", data);
      addNotification(data); // 🟢 상태 업데이트
    });

    eventSource.addEventListener("connect", () => {
      console.log("✅ SSE 연결 성공");
    });

    eventSource.onerror = (error) => {
      console.error("❌ SSE 오류", error);
      eventSource.close();
    };

    return () => {
      console.log("🛑 SSE 연결 종료");
      eventSource.close();
    };
  }, [user?.userId, addNotification]);
};

export default useSse;
