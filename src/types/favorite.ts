export interface FavoriteGroupType {
  groupId: number;
  name: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FavoriteItemType {
  id: number;
  userId: number;
  groupId: number;
  placeId: number;
  lat: number;
  lng: number;
  memo: string;
  address: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}
