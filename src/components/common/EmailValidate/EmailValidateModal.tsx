"use client";

import { useState } from "react";
import BaseModal from "../Modal/BaseModal";
import BaseButton from "../Button/BaseButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToastMessageContext } from "../ToastMessage";
import { sendEmailValidation } from "@/lib/api/auth";

interface EmailValidateModalProps {
  isOpen: boolean;
  onClose: (email?: string) => void;
}

const EmailValidateModal = ({ isOpen, onClose }: EmailValidateModalProps) => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const { showToastMessage } = useToastMessageContext();

  const handleClose = async () => {
    const email = user?.email;
    if (email) {
      setIsLoading(true);
      try {
        await sendEmailValidation(email);
        showToastMessage({
          type: "success",
          message: "인증메일이 전송되었습니다.",
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "인증 메일 전송 실패";
        showToastMessage({ type: "error", message: errorMessage });
      } finally {
        setIsLoading(false);
        onClose(email);
      }
    } else {
      showToastMessage({ type: "error", message: "이메일 확인이 필요합니다" });
      onClose();
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-2 pt-6 px-4">
        <p className="text-gray900 text-xl">
          이메일 인증이 필요한 서비스입니다
        </p>

        <BaseButton
          type="button"
          size="xl"
          color="skyblue300"
          variant="filled"
          className="mt-4"
          isLoading={isLoading}
          onClick={handleClose}
        >
          이메일 인증하러 가기
        </BaseButton>
      </div>
    </BaseModal>
  );
};

export default EmailValidateModal;
