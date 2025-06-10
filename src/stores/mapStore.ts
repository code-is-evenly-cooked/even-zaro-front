import { create } from "zustand";
import {
  FavoriteListResponse,
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
  groupId: number | null;

  // 모달 페이지
  page: PageType;
  setPagePlaceList: () => void;
  setPagePlaceDetail: (placeId: number) => void;
  setPageGroupList: (otherUserId: number) => void;
  setPageFavoriteList: (groupId: number) => void;

  // 장소 리스트
  placeList: PlaceListResponse | null;
  setPlaceList: (placeList: PlaceListResponse) => void;

  // 장소 상세
  placeDetail: PlaceDetailResponse | null;
  setPlaceDetail: (placeDetail: PlaceDetailResponse) => void;

  // 유저 그룹 리스트
  groupList: GroupListResponse[] | null;
  setGroupList: (groupList: GroupListResponse[]) => void;

  // 즐겨찾기 리스트
  favoriteList: FavoriteListResponse[] | null;
  setFavoriteList: (favoriteList: FavoriteListResponse[]) => void;
  groupInfo: GroupListResponse | null;
  setGroupInfo: (groupInfo : GroupListResponse) => void;

  // 즐겨찾기 추가 모달
  favoriteAddModal: boolean;
  setFavoriteAddModal: (favoriteAddModal: boolean) => void;

  // 내 위치
  myLocation : {lat: number, lng: number} | null;
  setMyLocation: (myLocation : {lat: number, lng: number}) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  // 초기값
  page: PAGE.PLACELIST,
  placeList: null,
  placeId: null,
  groupId: null,
  placeDetail: null,
  groupList: [],
  otherUserId: null,
  favoriteAddModal: false,
  favoriteList: null,
  groupInfo: null,
  myLocation : null,


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
  setFavoriteAddModal: (favoriteAddModal: boolean) =>
    set(() => ({
      favoriteAddModal: !favoriteAddModal,
    })),
  setPageFavoriteList: (grouId: number) =>
    set(() => ({
      groupId: grouId,
      page: PAGE.FAVORITELIST,
    })),
  setFavoriteList: (favoriteList: FavoriteListResponse[]) =>
    set(() => ({
      favoriteList: favoriteList
    })),
  setGroupInfo: (groupInfo: GroupListResponse) =>
    set(() => ({
      groupInfo: groupInfo,
    })),
  setMyLocation: (myLocation : {lat: number, lng: number}) =>
    set(() => ({
      myLocation: myLocation,
    }))
}));
