import { create } from "zustand";
import { PAGE, PageType } from "@/types/map";

interface UseMapPageStore {
  placeId: number | null;
  otherUserId: number | null;
  groupId: number | null;

  // 모달 페이지
  page: PageType;
  setPagePlaceList: () => void;
  setPagePlaceDetail: (placeId: number) => void;
  setPageGroupList: (otherUserId: number) => void;
  setPageFavoriteList: (groupId: number) => void;
}

export const useMapStore = create<UseMapPageStore>((set) => ({
  // 초기값
  page: PAGE.PLACELIST,
  otherUserId: null,
  placeId: null,
  groupId: null,

  setPagePlaceList: () =>
    set(() => ({
      page: PAGE.PLACELIST,
    })),
  setPagePlaceDetail: (placeId: number) =>
    set(() => ({
      page: PAGE.PLACEDETAIL,
      placeId: placeId,
    })),
  setPageGroupList: (otherUserId: number) =>
    set(() => ({
      page: PAGE.USERGROUPLIST,
      otherUserId: otherUserId,
    })),
  setPageFavoriteList: (groupId: number) =>
    set(() => ({
      groupId: groupId,
      page: PAGE.FAVORITELIST,
    })),
}));
