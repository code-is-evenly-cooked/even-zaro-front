import { sendResetPassword } from "@/lib/api/auth";
import { getErrorMessage } from "@/lib/error/getErrorMessage";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { validateEmail } from "@/utils/validate";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

const useForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showToastMessage } = useToastMessageContext();

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
    try {
      const message = await sendResetPassword(email);
      showToastMessage({ type: "success", message: message });
    } catch (err) {
      showToastMessage({
        type: "error",
        message: getErrorMessage(err, "메일 발송 실패"),
      });
    } finally {
      setIsLoading(false);
    }
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
