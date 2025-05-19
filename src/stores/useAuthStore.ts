import { create } from "zustand";

export type AuthProvider = "LOCAL" | "KAKAO";

export interface UserInfo {
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  provider: AuthProvider;
  // TODO: 선택입력 정보는 추후 추가하기
}

interface AuthState {
  user: UserInfo | null;
  isInitialized: boolean;
  setUser: (user: UserInfo | null) => void;
  clearUser: () => void;
  setInitialized: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isInitialized: false,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setInitialized: () => set({ isInitialized: true }),
}));
