import { useEffect } from "react";

const useSse = (userId: number | undefined) => {
  useEffect(() => {
    if (userId === undefined) return;

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
  }, [userId]);
};

export default useSse;
