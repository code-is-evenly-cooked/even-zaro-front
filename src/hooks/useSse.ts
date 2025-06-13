"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNotificationStore } from "@/stores/useNotificationStore";
import type { Notification } from "@/types/notification";
import { EventSourcePolyfill } from "event-source-polyfill";

const useSse = () => {
  const { user, accessToken } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!user?.userId || !accessToken) return;

    // 이전 연결 종료
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 300000, // 옵션: 5분
        withCredentials: false, // polyfill 사용 시 false
      },
    );

    eventSourceRef.current = eventSource;

    eventSource.addEventListener("notification", (event) => {
      const data: Notification = JSON.parse(event.data);
      console.log("📢 알림 도착!", data);
      addNotification(data);
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
  }, [user?.userId, accessToken, addNotification]);
};

export default useSse;
