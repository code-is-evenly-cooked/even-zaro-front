import { FavoriteListResponse } from "@/types/map";
import { MoreVertical, Star } from "lucide-react";
import { useMapStore } from "@/stores/mapStore";

interface FavoriteCardProps {
  favorite: FavoriteListResponse;
}

export function FavoriteCard({ favorite }: FavoriteCardProps) {
  const otherUserId = useMapStore((state) => state.otherUserId);
  const { setPageGroupList } = useMapStore();

  return(
    <>
      <li
        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
        onClick={() => setPageGroupList(otherUserId!)}
        key={favorite.id}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
            <Star size={16} className="text-violet-500" />
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900">
              {favorite.placeName}
            </div>
            <div className="text-xs text-gray-600">
              {/* 여기 응답 객체 백엔드단 코드 추가 되면 수정해야함!!!!!!!!!!!1*/}
              {/*장소 {group.groupFavoriteCount}*/}
            </div>
          </div>
        </div>
        <button className="hover:bg-gray-200 rounded-full p-1">
          <MoreVertical size={20} className="text-gray-400" />
        </button>
      </li>

    </>
  )



}
