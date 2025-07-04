import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getCookie } from "cookies-next";

export type AuthProvider = "LOCAL" | "KAKAO";
export type Gender = "MALE" | "FEMALE" | "UNKNOWN";
export const MBTI_LIST = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
] as const;
export type MBTI = (typeof MBTI_LIST)[number];

export interface UserInfo {
  userId: number;
  email: string;
  nickname: string;
  profileImage: string | null;
  birthday: string | null;
  liveAloneDate: string | null;
  gender: Gender | undefined;
  mbti: MBTI | undefined;
  provider: AuthProvider;
  isValidated: boolean;
}

interface AuthState {
  user: UserInfo | null;
  accessToken: string | null;
  isSocialLogin: boolean;
  setUser: (user: UserInfo | null) => void;
  setAccessToken: (token: string | null) => void;
  clearUser: () => void;
  setIsSocialLogin: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken:
        typeof window !== "undefined"
          ? (getCookie("access_token")?.toString() ?? null)
          : null,
      isSocialLogin: false,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null, accessToken: null }),
      setAccessToken: (token) => set({ accessToken: token }),
      setIsSocialLogin: (state) => set({ isSocialLogin: state }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        // 저장할 필드만 지정
        user: state.user,
        accessToken: state.accessToken,
        isSocialLogin: state.isSocialLogin,
      }),
    },
  ),
);
