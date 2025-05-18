import { SignupCredentials } from "@/types/auth";

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
