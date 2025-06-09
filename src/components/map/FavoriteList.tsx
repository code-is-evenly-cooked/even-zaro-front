import FallbackMessage from "@/components/common/Fallback/FallbackMessage";
import { useEffect } from "react";
import { FavoriteListResponse } from "@/types/map";
import { fetchFavoritesByGroup } from "@/lib/api/map";
import { useMapStore } from "@/stores/mapStore";
import { FavoriteCard } from "@/components/map/FavoriteCard";

export function FavoriteList() {
  const { groupId, favoriteList } = useMapStore((state) => state);
  const { setFavoriteList } = useMapStore();

  useEffect(() => {
    (async () => {
      try {
        if (groupId != null) {
          const data: FavoriteListResponse[] =
            await fetchFavoritesByGroup(groupId);
          setFavoriteList(data);
          console.log("그룹 즐겨찾기 조회 성공");
        }
      } catch (error) {
        console.error(
          "그룹의 즐겨찾기 리스트를 불러오는 데 실패했습니다.",
          error,
        );
        setFavoriteList([]);
      }
    })();
  }, [groupId]);

  return (
    <>
      <ul className="flex-1 overflow-y-auto divide-y">
        {favoriteList && favoriteList.length > 0 ? (
          favoriteList.map((favorite, idx) => (
            <FavoriteCard favorite={favorite} key={idx} />
          ))
        ) : (
          <FallbackMessage message="등록된 그룹이 없습니다." />
        )}
      </ul>
    </>
  );
}
