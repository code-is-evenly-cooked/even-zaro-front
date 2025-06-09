import { FavoriteListResponse } from "@/types/map";
import { MoreVertical } from "lucide-react";

interface FavoriteCardProps {
  favorite: FavoriteListResponse;
}

export function FavoriteCard({ favorite }: FavoriteCardProps) {

  return (
    <>
      <li
        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
        // onClick={() => setPageGroupList(otherUserId!)}
        key={favorite.id}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-medium text-sm text-gray-900">
              {favorite.placeName}
            </span>
            <span className="text-xs text-gray600">{favorite.address}</span>
            <span className="text-xs text-gray600 ">{favorite.memo}</span>

            <div className="text-xs text-gray-600"></div>
          </div>
        </div>
        <button className="hover:bg-gray-200 rounded-full p-1">
          <MoreVertical size={20} className="text-gray-400" />
        </button>
      </li>
    </>
  );
}
