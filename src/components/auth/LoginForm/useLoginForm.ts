"use client";

import { fetchUser, userLogin, userSocialLogin } from "@/lib/api/auth";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { useAuthStore } from "@/stores/useAuthStore";
import { validateEmail, validatePassword } from "@/utils/validate";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

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

      router.replace("/");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "로그인 실패";
      showToastMessage({ type: "error", message: errorMessage });
    } finally {
      handleLoadingChange("email", false);
    }
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleKakaoLogin = async () => {
    console.log("kakao Login");
    try {
      const res = await signIn("kakao", {
        redirect: false,
        callbackUrl: "/",
      });
      if (res?.error) {
        console.error("카카오 로그인 실패", res.error);
        return;
      }

      const session = await getSession();
      const kakaoAccessToken = session?.user?.accessToken;

      if (!kakaoAccessToken) {
        showToastMessage({ type: "error", message: "카카오 accessToken 누락" });
        return;
      }

      await userSocialLogin(kakaoAccessToken);
      const user = await fetchUser();

      setUser(user);
      router.replace("/");
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
