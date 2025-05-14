import { validateEmail } from "@/utils/validate";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

const useForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = useCallback(() => {
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return false;
    }
    setEmailError("");
    return true;
  }, [email]);

  const handleEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (emailError) setEmailError("");
    },
    [emailError],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // try {
    // 	await forgotPassword(email);
    // 	alert("비밀번호 재설정 메일이 발송되었습니다.");
    // } catch (err) {
    // 	if (err instanceof Error) {
    // 		alert(err.message);
    // 	} else {
    // 		alert("알 수 없는 오류가 발생했습니다.");
    // 	}
    // } finally {
    // 	setIsLoading(false);
    // }
  };

  return {
    email,
    emailError,
    isLoading,
    handleEmailChange,
    handleSubmit,
  };
};

export default useForgotPasswordForm;
