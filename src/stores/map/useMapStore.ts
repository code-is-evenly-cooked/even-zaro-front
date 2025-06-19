import { create } from "zustand";
import { MyLoc } from "@/types/map";

interface useMapStore {
  // 지도 객체
  map: kakao.maps.Map | null;
  setMap: (map: kakao.maps.Map) => void;
  // 내 위치
  myLocation: MyLoc | null;
  regionName: string | "";
  setMyLocation: (myLocation: { lat: number; lng: number }) => void;
  setRegionName: (myRegionName: string) => void;

  // 모달 상태
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}

export const useMapStore = create<useMapStore>((set) => ({
  // 초기값
  myLocation: null,
  regionName: "",
  map: null,
  openModal: true,

  setMyLocation: (myLocation: MyLoc) =>
    set(() => ({
      myLocation: myLocation,
    })),
  setRegionName: (regionName: string) =>
    set(() => ({
      regionName: regionName,
    })),
  setMap: (map) => set({ map }),
  setOpenModal: (openModal: boolean) =>
    set(() => ({
      openModal: !openModal,
    })),
}));
