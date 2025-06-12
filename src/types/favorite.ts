export interface FavoriteGroupType {
  groupId: number;
  name: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  groupFavoriteCount: number;
}

export interface FavoriteItemType {
  id: number;
  userId: number;
  groupId: number;
  placeId: number;
  placeName: string;
  lat: number;
  lng: number;
  memo: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}
