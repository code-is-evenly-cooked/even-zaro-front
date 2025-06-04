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
  place_id : number;
  placeName: string;
  address: string;
  category: string;
  lat: number,
  lng: number,
  favoriteCount: number,
}