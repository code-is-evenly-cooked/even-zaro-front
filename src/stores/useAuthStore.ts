import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  isInitialized: boolean;
  setUser: (user: UserInfo | null) => void;
  clearUser: () => void;
  setInitialized: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isInitialized: false,

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setInitialized: () => set({ isInitialized: true }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }), // 저장할 필드만 지정
    },
  ),
);
