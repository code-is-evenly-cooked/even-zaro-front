import { create } from "zustand";
import {
  GroupListResponse,
  PAGE,
  PageType,
  PlaceDetailResponse,
  PlaceListResponse,
} from "@/types/map";

interface MapStore {

  // 상태 변수
  placeId: number | null;
  otherUserId: number | null;

  // 모달 페이지
  page: PageType;
  setPagePlaceList: () => void;
  setPagePlaceDetail: (placeId: number) => void;
  setPageGroupList:(otherUserId: number) => void;

  // 장소 리스트
  placeList: PlaceListResponse | null;
  setPlaceList: (placeList: PlaceListResponse) => void;

  // 장소 상세
  placeDetail: PlaceDetailResponse | null;
  setPlaceDetail: (placeDetail: PlaceDetailResponse) => void;

  // 유저 그룹 리스트
  groupList: GroupListResponse[] | null;
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
