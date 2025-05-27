import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

const useSse = () => {
  const { user } = useAuthStore();
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!user?.userId) return;

    // 이전 연결 종료 (로그인 완료 감지 시 재연결)
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource(
      `http://localhost:8080/api/notifications/subscribe`,
      { withCredentials: true },
    );

    eventSource.addEventListener("notification", (event) => {
      const data = JSON.parse(event.data);
      console.log("📢 알림 도착!", data);
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
  }, [user?.userId]);
};

export default useSse;
