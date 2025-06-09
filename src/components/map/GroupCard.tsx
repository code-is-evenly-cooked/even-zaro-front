import { MoreVertical, Star } from "lucide-react";
import { GroupListResponse } from "@/types/map";
import { useMapStore } from "@/stores/mapStore";

interface GroupCardProps {
  group: GroupListResponse;
}

export function GroupCard({ group }: GroupCardProps) {
  const { setPageFavoriteList, setGroupInfo } = useMapStore();

  const handleClick = () => {
    setGroupInfo(group);
    setPageFavoriteList(group.groupId);
  };

  return (
    <>
      <li
        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
        onClick={handleClick}
        key={group.groupId}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
            <Star size={16} className="text-violet-500" />
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900">
              {group.name}
            </div>
            <div className="text-xs text-gray-600">
              장소 {group.groupFavoriteCount}
            </div>
          </div>
        </div>
        <button className="hover:bg-gray-200 rounded-full p-1">
          <MoreVertical size={20} className="text-gray-400" />
        </button>
      </li>
    </>
  );
}
