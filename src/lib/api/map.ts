import { client } from "@/lib/fetch/client";
import {
  PlaceListResponse,
  PlaceDetailResponse,
  GroupListResponse,
  FavoriteListResponse,
} from "@/types/map";

// lat, lng, distanceKm을 파라미터로 받아 사용
export const fetchPlaceList = async (
  lat: number,
  lng: number,
  distanceKm: number
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
  })
}

export const fetchFavoriteStatus = async(placeId : number) : Promise<boolean> => {
  return await client<boolean>(`/favorite/check`, {
    method: "GET",
    params: {
      placeId: placeId,
    }
  })
}

export const fetchFavoritesByGroup = async (groupId: number): Promise<FavoriteListResponse[]> => {
  return await client<FavoriteListResponse[]>(`/favorite/${groupId}/items`, {
    method: "GET",
  })
}