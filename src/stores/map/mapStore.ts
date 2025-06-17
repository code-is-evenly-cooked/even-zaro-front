import { create } from "zustand";
import {
  GroupListResponse, MyLoc,
} from "@/types/map";

interface MapStore {
  // 유저 그룹 리스트
  groupList: GroupListResponse[] | null;
  setGroupList: (groupList: GroupListResponse[]) => void;

  groupInfo: GroupListResponse | null;
  setGroupInfo: (groupInfo : GroupListResponse) => void;

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
  groupInfo: null,
  myLocation : null,
  regionName: null,
  map: null,

  setGroupList: (groupList: GroupListResponse[]) =>
    set(() => ({
      groupList: groupList,
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
