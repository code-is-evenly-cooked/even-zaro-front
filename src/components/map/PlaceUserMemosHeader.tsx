import { ArrowLeftIcon, LucideStar } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PlaceDetailResponse } from "@/types/map";
import { fetchFavoriteStatus } from "@/lib/api/map";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { useMapPageStore } from "@/stores/map/useMapPageStore";
import { useMapPlaceStore } from "@/stores/map/useMapPlaceStore";

interface PlaceUserMemosHeaderProps {
  placeDetail: PlaceDetailResponse;
}

export default function PlaceUserMemosHeader({
  placeDetail,
}: PlaceUserMemosHeaderProps) {
  const { placeId, setPagePlaceList } = useMapPageStore();
  const { setPlaceDetail } = useMapPlaceStore();
  const { showToastMessage } = useToastMessageContext();

  const [favorite, setFavorite] = useState(false);

  // 이전 버튼 클릭 시 이전 데이터 초기화
  function onClickBackBtn() {
    setPagePlaceList();
    setPlaceDetail(null); // 데이터 초기화
  }

  useEffect(() => {
    if (placeId !== null) {
      (async () => {
        try {
          const data = await fetchFavoriteStatus(placeId);
          setFavorite(data);
        } catch (error) {
          showToastMessage({
            type: "error",
            message: "장소의 즐겨찾기 상태를 불러오는 데 실패했습니다.",
          });
          console.error(
            "장소의 즐겨찾기 상태를 불러오는 데 실패했습니다",
            error,
          );
        }
      })();
    }
  }, [placeId]);

  return (
    <div className="relative w-full px-4 py-4">
      <div className="flex flex-col items-center justify-center">
        <button className="absolute left-4 top-4" onClick={onClickBackBtn}>
          <ArrowLeftIcon />
        </button>

        <div className="flex items-center space-x-2">
          <div className="flex self-start">
            <LucideStar
              className={favorite ? "text-yellow-400 fill-yellow-400" : " "}
            />
          </div>

          <div className="flex flex-col justify-center items-center text-center max-w-[200px]">
            <span className="font-bold text-gray900 text-lg leading-snug break-words">
              {placeDetail?.placeName}
            </span>
            <span className="text-xs text-gray600 leading-snug break-words">
              {placeDetail?.address}
            </span>
          </div>
          {/*<button className="absolute top-4 right-4 w-5 h-5 mt-0.5">*/}
          {/*  <MoreVerticalIcon />*/}
          {/*</button>*/}
        </div>
      </div>
    </div>
  );
}
