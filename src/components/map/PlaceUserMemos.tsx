import React, { useEffect } from "react";
import PlaceUserMemosHeader from "@/components/map/PlaceUserMemosHeader";
import { BookmarkInfo } from "@/components/map/BookmarkInfo";
import { UserMemoCards } from "@/components/map/UserMemoCards";
import { fetchPlaceDetail } from "@/lib/api/map";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { useMapPageStore } from "@/stores/map/useMapPageStore";
import { useMapPlaceStore } from "@/stores/map/useMapPlaceStore";

export default function PlaceUserMemos() {
  const { placeDetail, setPlaceDetail } = useMapPlaceStore();
  const { showToastMessage } = useToastMessageContext();
  const { placeId } = useMapPageStore();

  useEffect(() => {
    if (placeId !== null) {
      (async () => {
        try {
          const data = await fetchPlaceDetail(placeId);
          setPlaceDetail(data);
        } catch (error) {
          showToastMessage({
            type: "error",
            message: "장소 상세 정보를 불러오는 데 실패했습니다.",
          });
          console.error("장소 상세 정보를 불러오는 데 실패했습니다.", error);
        }
      })();
    }
  }, [placeId]);

  return (
    <div className="flex flex-col overflow-hidden">
    {placeDetail && (
        <>
          <PlaceUserMemosHeader placeDetail={placeDetail} />
          <BookmarkInfo placeDetail={placeDetail} />
          <UserMemoCards placeDetail={placeDetail} />
        </>
      )}
    </div>
  );
}
