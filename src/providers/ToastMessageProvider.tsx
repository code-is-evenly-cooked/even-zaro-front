"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import {
  type ToastMessageProps,
  type ToastMessageContextType,
  type ToastMessageType,
} from "@/types/toastMessage";

const ToastMessageContext = createContext<ToastMessageContextType | null>(null);

export function ToastMessageProvider({ children }: { children: ReactNode }) {
  const [toastMessages, setToastMessages] = useState<ToastMessageProps[]>([]);
  const timeoutIds = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useEffect(() => {
    const timeouts = timeoutIds.current;

    return () => {
      timeouts.forEach(clearTimeout);
      timeouts.clear();
    };
  }, []);

  const removeToastMessage = useCallback((id: string) => {
    console.log("🧹 removeToastMessage called:", id);
    setToastMessages((prev) => {
      return prev.filter((msg) => msg.id !== id);
    });
  }, []);

  const showToastMessage = useCallback(
    ({ message, type }: { message: string; type: ToastMessageType }) => {
      const id = crypto.randomUUID();

      setToastMessages((prev) => {
        const isDuplicate = prev.some((msg) => msg.message === message);
        if (isDuplicate) return prev;

        const timeoutId = setTimeout(() => {
          setToastMessages((p) => p.filter((m) => m.id !== id));
          timeoutIds.current.delete(timeoutId);
        }, 3000);

        timeoutIds.current.add(timeoutId);
        return [...prev, { id, message, type }];
      });
    },
    [],
  );

  return (
    <ToastMessageContext.Provider
      value={{ toastMessages, showToastMessage, removeToastMessage }}
    >
      {children}
    </ToastMessageContext.Provider>
  );
}

export const useToastMessageContext = () => {
  const context = useContext(ToastMessageContext);
  if (!context)
    throw new Error(
      "useToastMessageContext must be used within ToastMessageProvider",
    );
  return context;
};
