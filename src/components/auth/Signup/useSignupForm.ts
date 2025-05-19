import { userSignup } from "@/lib/api/auth";
import { AgreementsState, AgreementsType } from "@/types/agreement";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "@/utils/validate";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

type SignupFormType = "email" | "password" | "confirmPassword" | "nickname";

interface SignupFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  nickname?: string;
}

const useSignupForm = () => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });
  const [agreements, setAgreements] = useState<AgreementsState>({
    all: false,
    terms: false,
    privacy: false,
  });
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors: SignupFormErrors = {};

    const emailError = validateEmail(formState.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formState.password);
    if (passwordError) newErrors.password = passwordError;

    if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 다릅니다.";
    }

    const nicknameError = validateNickname(formState.nickname);
    if (nicknameError) newErrors.nickname = nicknameError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [
    formState.email,
    formState.password,
    formState.confirmPassword,
    formState.nickname,
  ]);

  const handleFormChange = useCallback(
    (key: SignupFormType) => (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormState((prev) => ({ ...prev, [key]: value }));
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: "" }));
      }
    },
    [errors],
  );

  const handleAgreementToggle = useCallback((key: AgreementsType) => {
    setAgreements((prev) => {
      if (key === "all") {
        const newValue = !prev.all;
        return {
          all: newValue,
          terms: newValue,
          privacy: newValue,
        };
      }

      const updated = { ...prev, [key]: !prev[key] };
      updated.all = updated.terms && updated.privacy;
      return updated;
    });
  }, []);

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!agreements.terms || !agreements.privacy) {
      alert("필수 약관에 동의해주세요");
      return;
    }

    setIsLoading(true);
    try {
      const email = await userSignup({
        email: formState.email,
        password: formState.password,
        nickname: formState.nickname,
      });

      router.replace("/email-validation?email=" + email);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formState,
    agreements,
    errors,
    isLoading,
    handleFormChange,
    handleAgreementToggle,
    handleSignup,
  };
};

export default useSignupForm;
