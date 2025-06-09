import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthProvider = "LOCAL" | "KAKAO";
export type Gender = "MALE" | "FEMALE";

export interface UserInfo {
  userId: number;
  email: string;
  nickname: string;
  profileImage: string | null;
  birthday: string | null;
  liveAloneDate: string | null;
  gender: Gender | undefined;
  mbti: string | null;
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
