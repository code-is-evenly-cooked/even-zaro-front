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
  FAVORITELIST: "FAVORITELIST,"
} as const;

export type PageType = (typeof PAGE)[keyof typeof PAGE];

export interface GroupListResponse {
  groupId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  groupFavoriteCount: number;
}

export interface FavoriteListResponse {
  id: number,
  userId: number,
  groupId: number,
  placeId: number,
  placeName: string,
  lat: number,
  lng: number,
  memo: string,
  createdAt: string,
  updatedAt: string,
  address: string,
  deleted: boolean
}

export interface MyLoc {
  lat: number,
  lng: number
}

export type markerInfos = markerInfo[];

export interface markerInfo {
  title: string;
  latlng: MyLoc;
  category: string;
  name : string;
  lat: number;
  lng: number;
  placeId: number;
  address: string;
}
