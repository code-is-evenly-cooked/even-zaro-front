import { AuthCredentials, SignupCredentials } from "@/types/auth";

export const userSignup = async (
  credentials: SignupCredentials,
): Promise<string> => {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message ?? "회원가입 실패");
  }

  return body.data.email;
};

// 로그인 성공 시 별도 반환 없음 (쿠키는 서버에서 저장됨)
export const userLogin = async (
  credentials: AuthCredentials,
): Promise<void> => {
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message ?? "로그인 실패");
  }
};

// 이메일 인증 메일 전송
export const sendEmailValidation = async (email: string): Promise<string> => {
  const res = await fetch("/api/auth/signup/email-verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message ?? "이메일 인증 메일 전송 실패");
  }

  return body.data.message;
};

// 비밀번호 재설정 메일 전송
export const sendResetPassword = async (email: string): Promise<string> => {
  const res = await fetch("/api/auth/signin/password-forget", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message ?? "비밀번호 재설정 메일 발송 실패");
  }

  return body.data.message;
};
