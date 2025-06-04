import { client } from "@/lib/fetch/client";
import { PlaceListResponse, PlaceDetailResponse } from "@/types/map";

// lat, lng, distanceKm을 파라미터로 받아 사용
export const fetchPlaceList = async (
  lat: number,
  lng: number,
  distanceKm: number
): Promise<PlaceListResponse[]> => {
  const url = `/map/place?lat=${lat}&lng=${lng}&distanceKm=${distanceKm}`;
  return await client<PlaceListResponse[]>(url, {
    method: "GET",
  });
};

export const fetchPlaceDetail = async (placeId: number): Promise<PlaceDetailResponse> => {
  return await client<PlaceDetailResponse>(`/map/place/${placeId}`, {
    method: "GET",
  });
};