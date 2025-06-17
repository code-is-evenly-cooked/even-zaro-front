import { create } from "zustand";
import {
  KakaoMapResponse,
  PlaceDetailResponse,
  PlaceListResponse,
} from "@/types/map";

interface useMapPlaceStore {
  // 장소 리스트
  placeList: PlaceListResponse | null;
  setPlaceList: (placeList: PlaceListResponse | null) => void;

  // 장소 상세
  placeDetail: PlaceDetailResponse | null;
  setPlaceDetail: (placeDetail: PlaceDetailResponse | null) => void;

  // 선택한 장소의 상세 정보
  selectPlaceDetail: KakaoMapResponse | null;
  setSelectPlaceDetail: (selectPlaceInfo: KakaoMapResponse | null) => void;
}

export const useMapPlaceStore = create<useMapPlaceStore>((set) => ({
  // 초기값
  placeList: null,
  placeDetail: null,
  selectPlaceDetail: null,

  setPlaceList: (placeList: PlaceListResponse | null) =>
    set(() => ({
      placeList: placeList,
    })),
  setPlaceDetail: (placeDetail: PlaceDetailResponse | null) =>
    set(() => ({
      placeDetail: placeDetail,
    })),
  setSelectPlaceDetail: (selectPlaceDetail: KakaoMapResponse | null) =>
    set(() => ({
      selectPlaceDetail: selectPlaceDetail,
    })),
}));
