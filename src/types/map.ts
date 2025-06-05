// 장소 정보
export interface PlaceDetailResponse {
  placeId: number;
  placeName: string;
  address: string;
  lat: number;
  lng: number;
  category: string;
  favoriteCount: number;
  usersInfo: UsersInfo[];
}

// 장소에 남긴 유저 정보
export interface UsersInfo {
  userId: number;
  profileImage: string;
  nickname: string;
  memo: string;
}

export interface PlaceListResponse {
  totalCount: number;
  placeInfos: PlaceInfos[];

}

export interface PlaceInfos {
  placeId : number;
  name: string;
  address: string;
  category: string;
  lat: number;
  lng: number;
  favoriteCount: number;
}

export const PAGE = {
  PLACELIST: "PLACELIST",
  PLACEDETAIL: "PLACEDETAIL",
  USERGROUPLIST: "USERGROUPLIST",
} as const;

export type PageType = (typeof PAGE)[keyof typeof PAGE];

export type GroupListResponseList = GroupListResponse[];

export interface GroupListResponse {
  groupId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}
