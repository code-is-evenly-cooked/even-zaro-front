"use client";

import { changePassword } from "@/lib/api/profile";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { validatePassword } from "@/utils/validate";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

type FormType = "currentPassword" | "newPassword" | "confirmPassword";

interface ChangePasswordFormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}
const useProfileChangePassword = () => {
  const [formState, setFormState] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ChangePasswordFormErrors>({});

  const { showToastMessage } = useToastMessageContext();

  const validateForm = useCallback(() => {
    const newErrors: ChangePasswordFormErrors = {};

    const currentPassword = validatePassword(formState.currentPassword);
    if (currentPassword) newErrors.currentPassword = currentPassword;

    const newPassword = validatePassword(formState.newPassword);
    if (newPassword) newErrors.newPassword = newPassword;

    if (formState.newPassword !== formState.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 다릅니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [
    formState.currentPassword,
    formState.newPassword,
    formState.confirmPassword,
  ]);

  const handleFormChange = useCallback(
    (key: FormType) => (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormState((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: "" }));
    },
    [],
  );

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await changePassword({
        currentPassword: formState.currentPassword,
        newPassword: formState.newPassword,
      });
      showToastMessage({
        type: "success",
        message: "비밀번호 변경에 성공했습니다.",
      });
      setFormState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "비밀번호 변경에 실패했습니다.";
      showToastMessage({ type: "error", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formState,
    isLoading,
    errors,
    handleFormChange,
    handleChangePassword,
  };
};

export default useProfileChangePassword;
