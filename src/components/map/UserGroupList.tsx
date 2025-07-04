import { ArrowLeft } from "lucide-react";
import { PAGE } from "@/types/map";
import { useProfile } from "@/hooks/useProfile";
import { GroupCardList } from "@/components/map/GroupCardList";
import { getDdayLabel } from "@/utils/date";
import Link from "next/link";
import { getProfileImageUrl } from "@/utils/image";
import Image from "next/image";
import { useMapPageStore } from "@/stores/map/useMapPageStore";
import { useMapGroupStore } from "@/stores/map/useMapGroupStore";

export function UserGroupList() {
  const { placeId, page, otherUserId, setPagePlaceDetail } = useMapPageStore();
  const { setGroupList } = useMapGroupStore();
  const { data: profile } = useProfile(otherUserId);

  // 이전 버튼 클릭시 이전 데이터 초기화
  function onClickBackBtn() {
    setPagePlaceDetail(placeId!);
    setGroupList([]); // 데이터 초기화
  }

  if (page === PAGE.USERGROUPLIST)
    return (
      <div className="flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          {/* 뒤로 가기*/}
          <button
            onClick={onClickBackBtn}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="text-sm font-medium text-gray-600">그룹 목록</div>
          <div className="w-6" />
        </div>

        <div className="flex justify-center gap-4 items-center py-4 border-b">
          <Link
            href={`/profile/${otherUserId}`}
            className="flex items-center gap-2"
          >
            <Image
              src={getProfileImageUrl(profile?.profileImage || null)}
              alt="프로필 이미지"
              width={40}
              height={40}
              className="rounded-full border-1 border-gray200 flex-shrink-0 aspect-square"
            />
          </Link>
          <div className="flex flex-col">
            <span className="font-semibold text-lg mt-2">
              {profile?.nickname}
            </span>
            {profile?.liveAloneDate && (
              <span className="text-sm text-gray-500">
                {getDdayLabel(profile.liveAloneDate)}
              </span>
            )}
          </div>
        </div>

        <GroupCardList />
      </div>
    );
}
