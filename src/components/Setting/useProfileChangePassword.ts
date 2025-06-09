"use client";

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

  const [errors, setErrors] = useState<ChangePasswordFormErrors>({});

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
  };

  return { formState, errors, handleFormChange, handleChangePassword };
};

export default useProfileChangePassword;
