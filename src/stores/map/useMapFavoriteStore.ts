import { create } from "zustand";
import { FavoriteListResponse } from "@/types/map";

interface useMapFavoriteStore {
  // 즐겨찾기 리스트
  favoriteList: FavoriteListResponse[] | [];
  setFavoriteList: (favoriteList: FavoriteListResponse[]) => void;

  // 즐겨찾기 추가 모달
  favoriteAddModal: boolean;
  setFavoriteAddModal: (favoriteAddModal: boolean) => void;
}

export const useMapFavoriteStore = create<useMapFavoriteStore>((set) => ({
  // 초기값
  favoriteAddModal: false,
  favoriteList: [],

  setFavoriteAddModal: (favoriteAddModal: boolean) =>
    set(() => ({
      favoriteAddModal: !favoriteAddModal,
    })),
  setFavoriteList: (favoriteList: FavoriteListResponse[]) =>
    set(() => ({
      favoriteList: favoriteList,
    })),
}));
