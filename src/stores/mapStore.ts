import { create } from "zustand";
import {
  FavoriteListResponse,
  GroupListResponse, KakaoMapResponse, MyLoc,
  PlaceDetailResponse,
  PlaceListResponse,
} from "@/types/map";

interface MapStore {
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
  myLocation : MyLoc | null;
  regionName: string | null;
  setMyLocation: (myLocation : {lat: number, lng: number}) => void;
  setRegionName: (myRegionName : string) => void;

  // 지도 객체
  map: kakao.maps.Map | null;
  setMap: (map: kakao.maps.Map) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  // 초기값
  groupList: [],
  favoriteAddModal: false,
  favoriteList: null,
  groupInfo: null,
  myLocation : null,
  regionName: null,
  map: null,

  setGroupList: (groupList: GroupListResponse[]) =>
    set(() => ({
      groupList: groupList,
    })),
  setFavoriteAddModal: (favoriteAddModal: boolean) =>
    set(() => ({
      favoriteAddModal: !favoriteAddModal,
    })),
  setFavoriteList: (favoriteList: FavoriteListResponse[]) =>
    set(() => ({
      favoriteList: favoriteList
    })),
  setGroupInfo: (groupInfo: GroupListResponse) =>
    set(() => ({
      groupInfo: groupInfo,
    })),
  setMyLocation: (myLocation : MyLoc) =>
    set(() => ({
      myLocation: myLocation,
    })),
  setRegionName: (regionName : string) =>
    set(() => ({
      regionName: regionName,
    })),
  setMap: (map) => set({ map }),
}));
