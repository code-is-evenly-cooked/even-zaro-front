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
    console.log(token);
    // try {
    //   await resetPassword(token, formState.password);
    //   alert("비밀번호가 성공적으로 변경되었습니다.");
    router.replace("/login");
    // } catch (err) {
    //   if (err instanceof Error) {
    //     alert(err.message);
    //   } else {
    //     alert("알 수 없는 오류가 발생했습니다.");
    //   }
    // } finally {
    //   setIsLoading(false);
    // }
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
