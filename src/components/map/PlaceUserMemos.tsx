import React, { useEffect } from "react";
import PlaceUserMemosHeader from "@/components/map/PlaceUserMemosHeader";
import { BookmarkInfo } from "@/components/map/BookmarkInfo";
import { UserMemoCards } from "@/components/map/UserMemoCards";
import { fetchPlaceDetail } from "@/lib/api/map";
import { useMapStore } from "@/stores/mapStore";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { useMapPageStore } from "@/stores/useMapPageStore";

export default function PlaceUserMemos() {
  const { placeDetail } = useMapStore((state) => state);
  const { setPlaceDetail } = useMapStore();
  const { showToastMessage } = useToastMessageContext();
  const { placeId } = useMapPageStore();


  useEffect(() => {
    if (placeId !== null) {
      (async () => {
        try {
          const data = await fetchPlaceDetail(placeId);
          setPlaceDetail(data);
        } catch (error) {
          showToastMessage({type: "error", message: "장소 상세 정보를 불러오는 데 실패했습니다."})
          console.error("장소 상세 정보를 불러오는 데 실패했습니다.", error);
        }
      })();
    }
  }, [placeId]);

  return (
    <div className="flex flex-col absolute -bottom-4 left-0 z-10 w-96 h-96 bg-white rounded-t-2xl shadow-lg overflow-hidden">
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
