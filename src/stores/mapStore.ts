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
  groupModal: boolean;
  setPagePlaceList: () => void;
  setPagePlaceDetail: (placeId: number) => void;
  setPlaceList: (placeList: PlaceListResponse) => void;
  setPlaceDetail: (placeDetail: PlaceDetailResponse) => void;
  setGroupModal: (groupModal: boolean) => void;
  setGroupList: (groupList: GroupListResponse[]) => void;
};

export const useMapStore = create<MapStore>((set) => ({
  // 초기값
  page: PAGE.PLACELIST,
  placeList: null,
  placeId: null,
  placeDetail: null,
  groupModal: false,
  groupList: [],

  setPagePlaceList: () =>
    set(() => ({
      page: PAGE.PLACELIST,
    })),
  setPagePlaceDetail: (placeId: number) =>
    set(() => ({
      page: PAGE.PLACEDETAIL,
      placeId: placeId,
    })),
  setPlaceList: (placeList: PlaceListResponse) =>
    set(() => ({
      placeList: placeList,
    })),
  setPlaceDetail: (placeDetail: PlaceDetailResponse) =>
    set(() => ({
      placeDetail: placeDetail,
    })),
  setGroupModal: (groupModal: boolean) =>
    set(() => ({
      groupModal: !groupModal,
    })),
  setGroupList: (groupList: GroupListResponse[]) =>
    set(() => ({
      groupList: groupList,
    })),
}));
