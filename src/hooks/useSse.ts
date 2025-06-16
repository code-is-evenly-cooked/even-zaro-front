"use client";

import { useEffect, useRef, useCallback } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNotificationStore } from "@/stores/useNotificationStore";
import type { Notification } from "@/types/notification";
import { EventSourcePolyfill } from "event-source-polyfill";
import { getCookie } from "cookies-next";
import { refreshToken } from "@/lib/fetch/refresh/client";
const MAX_RETRIES = 5;

const useSse = () => {
  const { user, accessToken, setAccessToken } = useAuthStore();
  const { addNotification } = useNotificationStore();

  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);

  const connectSse = useCallback(() => {
    if (!accessToken) return;

    const eventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true, // 쿠키 인증 유지
        heartbeatTimeout: 10800000, // 3시간 // 서버는 30초마다 ping 보냄
      },
    );

    eventSourceRef.current = eventSource;

    eventSource.addEventListener("connect", () => {
      console.log("✅ SSE 연결 성공");
      retryCountRef.current = 0;
    });

    eventSource.addEventListener("notification", (event) => {
      const data: Notification = JSON.parse(event.data);
      console.log("📢 알림 도착!", data);
      addNotification(data);
    });

    eventSource.addEventListener("ping", () => {
      console.log("💓 서버 ping 수신 (keep-alive)");
    });

    eventSource.onerror = async (error) => {
      console.error("❌ SSE 오류 발생", error);
      eventSource.close();

      retryCountRef.current += 1;

      const refreshed = await refreshToken();
      if (refreshed) {
        const newAccessToken = getCookie("access_token");
        if (newAccessToken && typeof newAccessToken === "string") {
          setAccessToken(newAccessToken);
          console.log("accessToken 갱신 후 SSE 재연결");
          return;
        }
      }

      if (retryCountRef.current > MAX_RETRIES) {
        console.warn("🚫 SSE 재연결 최대 횟수 초과. 중단합니다.");
        return;
      }

      const retryDelay = Math.min(
        3000 * 2 ** (retryCountRef.current - 1),
        60000,
      );
      console.log(
        `🔁 SSE 재연결 시도 중... (지연: ${retryDelay}ms, ${retryCountRef.current}/${MAX_RETRIES})`,
      );

      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      reconnectTimer.current = setTimeout(() => {
        connectSse();
      }, retryDelay);
    };
  }, [accessToken, addNotification, setAccessToken]);

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
