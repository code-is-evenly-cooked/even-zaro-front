"use client";

import { validateEmail, validatePassword } from "@/utils/validate";
import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

type FormType = "email" | "password";

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const useLoginForm = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState({
    email: false,
    kakao: false,
  });

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
      // const response = await userLogin({
      //   email: formState.email,
      //   password: formState.password,
      // });
      // saveAuthCookie(
      //   response.accessToken,
      //   response.refreshToken,
      //   response.userId,
      // );
      // useAuthStore.getState().setAuth(response.accessToken, "local", {
      //   nickname: response.nickname,
      //   userId: response.userId,
      // });
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
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
        redirect: true,
        callbackUrl: "/login",
      });
      if (res?.error) {
        console.error("카카오 로그인 실패", res.error);
        return;
      }
    } catch (error) {
      console.error("카카오 로그인 중 에러", error);
    }
  };

  const getAccessTokenFromSession = async (session: Session | null) => {
    // TODO: 서버 통신하는 로직 추가 & 로그인 성공시 세션 정보 삭제?
    console.log(session?.user.accessToken);
  };

  useEffect(() => {
    if (status === "loading") {
      handleLoadingChange("kakao", true);
      return;
    }
    if (status === "authenticated") {
      getAccessTokenFromSession(session);
    }
  }, [status, session]);

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
