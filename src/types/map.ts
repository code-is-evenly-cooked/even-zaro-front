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
  placeInfos: PlaceInfo[];
}

export interface PlaceInfo {
  placeId: number;
  kakaoPlaceId: number;
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
  FAVORITELIST: "FAVORITELIST,",
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
  id: number;
  userId: number;
  groupId: number;
  placeId: number;
  placeName: string;
  lat: number;
  lng: number;
  memo: string;
  createdAt: string;
  updatedAt: string;
  address: string;
  deleted: boolean;
}

export interface FavoriteAddRequest {
  kakaoPlaceId: number;
  memo: string;
  placeName: string;
  address: string;
  lat: number;
  lng: number;
  category: string;
}

export interface FavroiteAddResponse {
  placeName: string;
  placeId: number;
  memo: string;
  lat: number;
  lng: number;
  address: string;
}

export interface MyLoc {
  lat: number;
  lng: number;
}

export interface MarkerInfo {
  title: string;
  latlng: MyLoc;
  category: string;
  name: string;
  lat: number;
  lng: number;
  placeId: number;
  kakaoPlaceId: number;
  address: string;
}

export interface KakaoMapResponse {
  id: number;
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  phone: string;
  place_name: string;
  place_url: string;
  x: number;
  y: number;
}

// types/map.ts 등
export type CategoryType = "All" | "FD6" | "CE7" | "CS2" | "MT1" | "Etc";

export type CategoryGroupCode =
  | "MT1"
  | "CS2"
  | "PS3"
  | "SC4"
  | "AC5"
  | "PK6"
  | "OL7"
  | "SW8"
  | "BK9"
  | "CT1"
  | "AG2"
  | "PO3"
  | "AT4"
  | "AD5"
  | "FD6"
  | "CE7"
  | "HP8"
  | "PM9";

// 분류 유틸
export const mapToCategory = (code: CategoryGroupCode): CategoryType =>
  ["FD6", "CE7", "CS2", "MT1"].includes(code) ? (code as CategoryType) : "Etc";

// 장소 정렬 기준 타입
export type SortType = "favorite" | "distance" | "name";
