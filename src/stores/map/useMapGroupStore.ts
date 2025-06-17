import { create } from "zustand";
import { GroupListResponse } from "@/types/map";

interface useMapGroupStore {
  // 유저 그룹 리스트
  groupList: GroupListResponse[] | [];
  setGroupList: (groupList: GroupListResponse[]) => void;

  groupInfo: GroupListResponse | null;
  setGroupInfo: (groupInfo: GroupListResponse) => void;
}

export const useMapGroupStore = create<useMapGroupStore>((set) => ({
  // 초기값
  groupList: [],
  groupInfo: null,

  setGroupList: (groupList: GroupListResponse[]) =>
    set(() => ({
      groupList: groupList,
    })),
  setGroupInfo: (groupInfo: GroupListResponse) =>
    set(() => ({
      groupInfo: groupInfo,
    })),
}));
