import { useState, useEffect } from "react";
import { getDistanceFromLatLonInKm } from "@/utils/mapUtil";
import { fetchPlaceList } from "@/lib/api/map";
import type {
  PlaceListResponse,
  PlaceInfo,
  CategoryType,
  SortType,
} from "@/types/map";
import { useMapPlaceStore } from "@/stores/map/useMapPlaceStore";

type PlaceWithDistance = PlaceInfo & { distanceKm: number };

interface UseHotPlaceOptions {
  category: CategoryType;
  sort: SortType;
  radiusKm?: number;
  maxResults?: number;
}

export function useHotPlace({
  category,
  sort,
  radiusKm = 2, // 장소 조회 반경 - 기본 값 2km
  maxResults = 20, // 리스트 조회 개수 - 기본 값 20개
}: UseHotPlaceOptions) {
  const [places, setPlaces] = useState<PlaceWithDistance[]>([]);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { setPlaceList } = useMapPlaceStore();

  // 사용자 위치 가져오기
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setError("위치 정보를 가져오는 데 실패했습니다.");
        setLoading(false);
      },
    );
  }, []);

  // 위치에 따라 핫플레이스 리스트 가져오기
  useEffect(() => {
    if (!location) return;

    (async () => {
      try {
        const data: PlaceListResponse = await fetchPlaceList(
          location.lat,
          location.lng,
          radiusKm,
        );
        if (!data?.placeInfos) return;

        const knownCategories: CategoryType[] = ["FD6", "CE7", "CS2", "MT1"]; // 음식점, 카페, 편의점, 마트
        const filtered =
          category === "All"
            ? data.placeInfos
            : category === "Etc" // 위에 knownCategories 를 제외한 나머지 카테고리
              ? data.placeInfos.filter(
                  (p) => !knownCategories.includes(p.category as CategoryType),
                )
              : data.placeInfos.filter((p) => p.category === category);

        const hotPlaces = filtered.filter((p) => p.favoriteCount > 0);
        const otherPlaces = filtered.filter((p) => p.favoriteCount === 0);
        const sorted = [...hotPlaces, ...otherPlaces];

        const withDistance = sorted.map((place) => ({
          ...place,
          distanceKm: getDistanceFromLatLonInKm(
            location.lat,
            location.lng,
            place.lat,
            place.lng,
          ),
        }));

        if (sort === "distance") {
          withDistance.sort((a, b) => a.distanceKm - b.distanceKm);
        } else if (sort === "name") {
          withDistance.sort((a, b) => a.name.localeCompare(b.name));
        }

        const sliced = withDistance.slice(0, maxResults);
        setPlaces(sliced);
        setPlaceList({ placeInfos: sliced, totalCount: sliced.length });
      } catch (e) {
        console.error(e);
        setError("핫플레이스를 불러오는 데 실패했습니다.");
      }
    })();
  }, [location, category, sort, radiusKm, maxResults, setPlaceList]);

  return { places, loading, error };
}
