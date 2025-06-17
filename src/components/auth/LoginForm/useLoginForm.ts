"use client";

import { fetchUser, userLogin } from "@/lib/api/auth";
import { getErrorMessage } from "@/lib/error/getErrorMessage";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { useAuthStore } from "@/stores/useAuthStore";
import { validateEmail, validatePassword } from "@/utils/validate";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { getCookie } from "cookies-next";

type FormType = "email" | "password";

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const useLoginForm = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState({
    email: false,
    kakao: false,
  });
  const { showToastMessage } = useToastMessageContext();
  const { setUser } = useAuthStore();

  const validateForm = useCallback(() => {
    const newErrors: LoginFormErrors = {};

    const emailError = validateEmail(formState.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formState.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formState.email, formState.password]);

  const handleFormChange = useCallback(
    (key: FormType) => (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormState((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: "" }));
    },
    [],
  );

  const handleLoadingChange = useCallback(
    (key: "email" | "kakao", value: boolean) => {
      setIsLoading((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    handleLoadingChange("email", true);
    try {
      await userLogin({
        email: formState.email,
        password: formState.password,
      });

      const user = await fetchUser();
      setUser(user);

      const accessToken = getCookie("access_token"); // 쿠키에서 꺼내서
      if (accessToken && typeof accessToken === "string") {
        useAuthStore.getState().setAccessToken(accessToken); // 전역 저장
        console.log("accessToken 저장됨:", accessToken);
      } else {
        console.warn("accessToken이 쿠키에 없음");
      }

      router.replace("/");
    } catch (err) {
      showToastMessage({ type: "error", message: getErrorMessage(err) });
    } finally {
      handleLoadingChange("email", false);
    }
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleKakaoLogin = async () => {
    try {
      await signIn("kakao", {
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("카카오 로그인 중 에러", error);
      showToastMessage({
        type: "error",
        message: "카카오 로그인 중 오류가 발생했습니다.",
      });
    }
  };

  return {
    formState,
    errors,
    isLoading,
    handleFormChange,
    handleLogin,
    handleSignup,
    handleKakaoLogin,
  };
};

export default useLoginForm;
