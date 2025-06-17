import FallbackMessage from "@/components/common/Fallback/FallbackMessage";
import { useEffect } from "react";
import { FavoriteListResponse } from "@/types/map";
import { fetchFavoritesByGroup } from "@/lib/api/map";
import { useMapStore } from "@/stores/map/mapStore";
import { FavoriteCard } from "@/components/map/FavoriteCard";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { useMapPageStore } from "@/stores/map/useMapPageStore";

export function FavoriteList() {
  const { favoriteList } = useMapStore((state) => state);
  const { groupId } = useMapPageStore();
  const { setFavoriteList } = useMapStore();
  const { showToastMessage } = useToastMessageContext();


  useEffect(() => {
    (async () => {
      try {
        if (groupId != null) {
          const data: FavoriteListResponse[] =
            await fetchFavoritesByGroup(groupId);
          setFavoriteList(data);
        }
      } catch (error) {
        showToastMessage({ type: "error", message: "그룹의 즐겨찾기 리스트를 불러오는 데 실패했습니다." });
        console.error(
          "그룹의 즐겨찾기 리스트를 불러오는 데 실패했습니다.",
          error,
        );
        setFavoriteList([]);
      }
    })();
  }, [groupId]);

  return (
      <ul className="flex-1 overflow-y-auto divide-y">
        {favoriteList && favoriteList.length > 0 ? (
          favoriteList.map((favorite, idx) => (
            <FavoriteCard favorite={favorite} key={idx} />
          ))
        ) : (
          <FallbackMessage message="등록된 즐겨찾기가 없습니다." />
        )}
      </ul>
  );
}
