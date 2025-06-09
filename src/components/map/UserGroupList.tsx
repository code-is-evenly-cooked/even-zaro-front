import { ArrowLeft, MoreVertical, Star } from "lucide-react";
import { DefaultProfileIcon } from "@/components/common/Icons";
import { useEffect } from "react";
import { GroupListResponseList, PAGE } from "@/types/map";
import { fetchGroupList } from "@/lib/api/map";
import { useMapStore } from "@/stores/mapStore";
import { useProfile } from "@/hooks/useProfile";
import FallbackMessage from "@/components/common/Fallback/FallbackMessage";

export function UserGroupList() {
  const { groupList, placeId, page, otherUserId } = useMapStore((state) => state);
  const { setGroupList, setPagePlaceDetail } = useMapStore();
  const { data: profile } = useProfile(otherUserId);

  useEffect(() => {
    (async () => {
      try {
        if (otherUserId != null) {
          const data: GroupListResponseList = await fetchGroupList(otherUserId);
          setGroupList(data);
        }

      } catch (error) {
        console.error("유저의 그룹 리스트를 불러오는 데 실패했습니다.", error);
      }
    })();
  }, [otherUserId]);

  return (
    <>
      {page === PAGE.USERGROUPLIST && (
        <div className={`w-[24rem] h-[24rem] rounded-t-2xl shadow-lg overflow-hidden bg-white absolute left-4 bottom-[-1rem] z-10 flex flex-col`}>
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

          <div className="flex flex-col items-center py-4 border-b">
            <DefaultProfileIcon className="w-10 h-10 rounded-full object-cover" />
            <span className="font-semibold text-lg mt-2">{profile?.nickname}</span>
            <span className="text-sm text-gray-500">{profile?.liveAloneDate}</span>
          </div>

          <ul className="flex-1 overflow-y-auto divide-y">
            {groupList && groupList.length > 0 ? (
              groupList.map((group, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
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
                        {/* 여기 응답 객체 백엔드단 코드 추가 되면 수정해야함!!!!!!!!!!!1*/}
                        장소 {group.groupFavoriteCount ?? 0}
                      </div>
                    </div>
                  </div>
                  <button className="hover:bg-gray-200 rounded-full p-1">
                    <MoreVertical size={20} className="text-gray-400" />
                  </button>
                </li>
              ))
            ) : (
              <FallbackMessage
                className="등록된 그룹이 없습니다."
              />
              // <div className="text-sm text-gray-600 text-center py-10">
              //   등록된 그룹이 없습니다.
              // </div>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
