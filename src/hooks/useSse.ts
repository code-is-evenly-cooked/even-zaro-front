"use client";

import { useEffect, useRef, useCallback } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNotificationStore } from "@/stores/useNotificationStore";
import type { Notification } from "@/types/notification";
import { EventSourcePolyfill } from "event-source-polyfill";

const useSse = () => {
  const { user, accessToken } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);

  const connectSse = useCallback(() => {
    if (!accessToken) return;

    const eventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true, // 쿠키 인증 유지
        heartbeatTimeout: 65000, // 서버가 30초마다 ping 보낼 경우, 여유롭게 65초 설정
      },
    );

    eventSourceRef.current = eventSource;

    eventSource.addEventListener("connect", () => {
      console.log("✅ SSE 연결 성공");
    });

    eventSource.addEventListener("notification", (event) => {
      const data: Notification = JSON.parse(event.data);
      console.log("📢 알림 도착!", data);
      addNotification(data);
    });

    eventSource.addEventListener("ping", () => {
      console.log("💓 서버 ping 수신 (keep-alive)");
    });

    eventSource.onerror = (error) => {
      console.error("❌ SSE 오류 발생", error);
      eventSource.close();

      // 재연결 시도
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      reconnectTimer.current = setTimeout(() => {
        console.log("🔁 SSE 재연결 시도 중...");
        connectSse();
      }, 3000);
    };
  }, [accessToken, addNotification]);

  useEffect(() => {
    if (!user?.userId || !accessToken) return;

    connectSse();

    return () => {
      console.log("🛑 SSE 연결 종료");
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
    };
  }, [user?.userId, accessToken, connectSse]);
};

export default useSse;
