"use client";

import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import ToastMessageItem from "./ToastMessageItem";

const ToastMessageContainer = () => {
  const { toastMessages } = useToastMessageContext();

  return (
    <div
      className="fixed bottom-32 left-4 sm:left-6 z-50 flex flex-col gap-4 w-full max-w-md px-4 pointer-events-auto"
      aria-live="polite"
    >
      {toastMessages.map((toast) => (
        <ToastMessageItem key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastMessageContainer;
