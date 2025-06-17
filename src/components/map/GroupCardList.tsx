import FallbackMessage from "@/components/common/Fallback/FallbackMessage";
import { useEffect } from "react";
import { GroupListResponse } from "@/types/map";
import { fetchGroupList } from "@/lib/api/map";
import { useMapStore } from "@/stores/map/mapStore";
import { GroupCard } from "@/components/map/GroupCard";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { useMapPageStore } from "@/stores/map/useMapPageStore";

export function GroupCardList() {
  const { groupList } = useMapStore((state) => state);
  const { setGroupList } = useMapStore();
  const { showToastMessage } = useToastMessageContext();
  const { otherUserId } = useMapPageStore();

  useEffect(() => {
    (async () => {
      try {
        if (otherUserId != null) {
          const data: GroupListResponse[] = await fetchGroupList(otherUserId);
          setGroupList(data);
        }
      } catch (error) {
        showToastMessage({
          type: "error",
          message: "유저의 그룹 리스트를 불러오는 데 실패했습니다",
        });
        console.error(".", error);
      }
    })();
  }, [otherUserId]);

  return (
    <ul className="flex-1 overflow-y-auto divide-y">
      {groupList && groupList.length > 0 ? (
        groupList.map((group, idx) => <GroupCard group={group} key={idx} />)
      ) : (
        <FallbackMessage className="등록된 그룹이 없습니다." />
      )}
    </ul>
  );
}
