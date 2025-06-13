import { client } from "@/lib/fetch/client";
import {
  FavoriteAddRequest,
  FavoriteListResponse,
  FavroiteAddResponse,
  GroupListResponse,
  PlaceDetailResponse,
  PlaceListResponse,
} from "@/types/map";

// lat, lng, distanceKm을 파라미터로 받아 사용
export const fetchPlaceList = async (
  lat: number,
  lng: number,
  distanceKm: number,
): Promise<PlaceListResponse> => {
  const url = `/map/place?lat=${lat}&lng=${lng}&distanceKm=${distanceKm}`;
  return await client<PlaceListResponse>(url, {
    method: "GET",
  });
};

export const fetchPlaceDetail = async (placeId: number): Promise<PlaceDetailResponse> => {
  return await client<PlaceDetailResponse>(`/map/place/${placeId}`, {
    method: "GET",
  });
};

export const fetchGroupList = async (userId: number): Promise<GroupListResponse[]> => {
  return await client<GroupListResponse[]>(`/group/user/${userId}/group`, {
    method: "GET",
  });
};

export const fetchFavoriteStatus = async (placeId: number): Promise<boolean> => {
  return await client<boolean>(`/favorite/check`, {
    method: "GET",
    params: {
      placeId: placeId,
    },
  });
};

export const fetchFavoritesByGroup = async (groupId: number): Promise<FavoriteListResponse[]> => {
  return await client<FavoriteListResponse[]>(`/favorite/${groupId}/items`, {
    method: "GET",
  });
};

// 그룹 추가 api
export const postAddGroup = async (groupName: string): Promise<string> => {
  return await client<string>(`/group`, {
    method: "POST",
    body: JSON.stringify({
      groupName: groupName
    })
  });
};

export const postAddFavorite = async (groupId: number, {
  kakaoPlaceId,
  memo,
  placeName,
  address,
  lat,
  lng,
  category,
}: FavoriteAddRequest): Promise<FavroiteAddResponse> => {
  console.log("api 호출 완료");
  return await client<FavroiteAddResponse>(`/favorite/groups/${groupId}/favorites`, {
    method: "POST",
    body: JSON.stringify({
      kakaoPlaceId : kakaoPlaceId,
      memo: memo,
      placeName: placeName,
      address: address,
      lat: lat,
      lng: lng,
      category: category,
    }),
  });
};
