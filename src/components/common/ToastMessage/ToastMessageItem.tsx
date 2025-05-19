"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import IconButton from "@/components/common/Button/IconButton";
import { type ToastMessageProps } from "@/types/toastMessage";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { CloseIcon } from "../Icons";

const ToastMessageItem = ({ id, message, type }: ToastMessageProps) => {
  const { removeToastMessage } = useToastMessageContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timeout);
  }, [id]);

  const typeClasses = {
    error: "bg-red200 text-gray600",
    success: "bg-green200 text-gray600",
    info: "bg-skyblue100 text-gray600",
  };

  return (
    <div
      role="status"
      className={clsx(
        "flex items-center justify-between w-full p-4 shadow-lg rounded-xl animate-slideIn",
        typeClasses[type],
        mounted ? "opacity-100" : "opacity-0",
      )}
    >
      <span className="text-body font-medium pr-4">{message}</span>
      <IconButton
        icon={<CloseIcon />}
        label="알림 닫기"
        onClick={() => removeToastMessage(id)}
        isTransparent
        className="hover:bg-white/20"
        aria-label="알림 닫기"
      />
    </div>
  );
};

export default ToastMessageItem;
