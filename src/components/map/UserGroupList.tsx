import { ArrowLeft } from "lucide-react";
import { DefaultProfileIcon } from "@/components/common/Icons";
import { PAGE } from "@/types/map";
import { useMapStore } from "@/stores/mapStore";
import { useProfile } from "@/hooks/useProfile";
import { GroupCardList } from "@/components/map/GroupCardList";
import { getDdayLabel } from "@/utils/date";

export function UserGroupList() {
  const { placeId, page, otherUserId } = useMapStore((state) => state);
  const { setPagePlaceDetail } = useMapStore();
  const { data: profile } = useProfile(otherUserId);

  if (page === PAGE.USERGROUPLIST)
    return (
      <div
        className={`w-[24rem] h-[24rem] rounded-t-2xl shadow-lg overflow-hidden bg-white absolute left-0 bottom-[-1rem] z-10 flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b">
          {/* 뒤로 가기*/}
          <button
            onClick={() => setPagePlaceDetail(placeId!)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="text-sm font-medium text-gray-600">그룹 목록</div>
          <div className="w-6" />
        </div>

        <div className="flex justify-center gap-4 items-center py-4 border-b">
          <DefaultProfileIcon className="w-10 h-10 rounded-full object-cover" />

          <div className="flex flex-col">
            <span className="font-semibold text-lg mt-2">
              {profile?.nickname}
            </span>
            <span className="text-sm text-gray-500">
              {getDdayLabel(profile?.liveAloneDate)}
            </span>
          </div>
        </div>

        <GroupCardList />
      </div>
    );
}
