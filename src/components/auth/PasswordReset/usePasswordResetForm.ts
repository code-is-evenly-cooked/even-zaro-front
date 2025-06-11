import { resetPassword } from "@/lib/api/auth";
import { getErrorMessage } from "@/lib/error/getErrorMessage";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { validatePassword } from "@/utils/validate";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

type FormType = "password" | "passwordConfirm";

interface PasswordResetErrors {
  password?: string;
  passwordConfirm?: string;
}

const usePasswordResetForm = (token: string) => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState<PasswordResetErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { showToastMessage } = useToastMessageContext();

  const validateForm = useCallback(() => {
    const newErrors: PasswordResetErrors = {};

    const passwordError = validatePassword(formState.password);
    if (passwordError) newErrors.password = passwordError;

    if (formState.password !== formState.passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 다릅니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formState.password, formState.passwordConfirm]);

  const handleFormChange = useCallback(
    (key: FormType) => (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormState((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: "" }));
    },
    [],
  );

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const message = await resetPassword(token, formState.password);
      showToastMessage({ type: "success", message: message });
      setTimeout(() => {
        router.replace("/login");
      }, 2000);
    } catch (err) {
      showToastMessage({
        type: "error",
        message: getErrorMessage(err, "비밀번호 변경 실패"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formState,
    errors,
    isLoading,
    handleFormChange,
    handleResetPassword,
  };
};

export default usePasswordResetForm;
