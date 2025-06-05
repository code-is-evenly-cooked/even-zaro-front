import { create } from "zustand";
import {
  GroupListResponse,
  PAGE,
  PageType,
  PlaceDetailResponse,
  PlaceListResponse,
} from "@/types/map";

type MapStore = {
  page: PageType;
  placeList: PlaceListResponse | null;
  placeId: number | null;
  placeDetail: PlaceDetailResponse | null;
  groupList: GroupListResponse[] | null;
  otherUserId: number | null;
  setPagePlaceList: () => void;
  setPagePlaceDetail: (placeId: number) => void;
  setPageGroupList:(otherUserId: number) => void;
  setPlaceList: (placeList: PlaceListResponse) => void;
  setPlaceDetail: (placeDetail: PlaceDetailResponse) => void;
  setGroupList: (groupList: GroupListResponse[]) => void;
};

export const useMapStore = create<MapStore>((set) => ({
  // 초기값
  page: PAGE.PLACELIST,
  placeList: null,
  placeId: null,
  placeDetail: null,
  groupList: [],
  otherUserId: null,


  setPagePlaceList: () =>
    set(() => ({
      page: PAGE.PLACELIST,
    })),
  setPagePlaceDetail: (placeId: number) =>
    set(() => ({
      page: PAGE.PLACEDETAIL,
      placeId: placeId,
    })),
  setPageGroupList:(otherUserId: number) =>
    set(() => ({
      page: PAGE.USERGROUPLIST,
      otherUserId: otherUserId,
    })),
  setPlaceList: (placeList: PlaceListResponse) =>
    set(() => ({
      placeList: placeList,
    })),
  setPlaceDetail: (placeDetail: PlaceDetailResponse) =>
    set(() => ({
      placeDetail: placeDetail,
    })),
  setGroupList: (groupList: GroupListResponse[]) =>
    set(() => ({
      groupList: groupList,
    })),
}));
