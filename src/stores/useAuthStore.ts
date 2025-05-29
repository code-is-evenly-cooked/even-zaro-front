import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthProvider = "LOCAL" | "KAKAO";

export interface UserInfo {
  userId: number;
  email: string;
  nickname: string;
  profileImage: string | null;
  provider: AuthProvider;
  isValidated: boolean;
  // TODO: 선택입력 정보는 추후 추가하기
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
