import { create } from "zustand";
import { PAGE, PageType, PlaceDetailResponse, PlaceListResponse } from "@/types/map";

type MapStore = {
  page: PageType;
  placeList: PlaceListResponse | null;
  placeId: number | null;
  placeDetail: PlaceDetailResponse | null;
  groupModal: boolean;
  setPagePlaceList: () => void;
  setPagePlaceDetail: (placeDetail: PlaceDetailResponse) => void;
};

export const useMapStore = create<MapStore>((set) => ({
  // 초기값
  page: PAGE.PLACELIST,
  placeList: null,
  placeId: null,
  placeDetail: null,
  groupModal: false,

  setPagePlaceList: () =>
    set(() => ({
      page: PAGE.PLACELIST,
    })),
  setPagePlaceDetail: () =>
    set(() => ({
      page: PAGE.PLACEDETAIL,
    })),

}));