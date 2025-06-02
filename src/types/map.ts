// 장소 정보
export interface PlaceDetailResponse {
  placeId: number;
  placeName: string;
  address: string;
  lat: number;
  lng: number;
  favoriteCount: number;
  userInfo: UserInfo[];
}

// 장소에 남긴 유저 정보
export interface UserInfo {
  userId: number;
  profileImage: string;
  nickname: string;
  memo: string;
}

