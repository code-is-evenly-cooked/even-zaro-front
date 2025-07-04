import { ArrowLeft } from "lucide-react";
import { PAGE } from "@/types/map";
import { useProfile } from "@/hooks/useProfile";
import { FavoriteList } from "@/components/map/FavoriteList";
import { getDdayLabel } from "@/utils/date";
import Link from "next/link";
import Image from "next/image";
import { getProfileImageUrl } from "@/utils/image";
import { useMapPageStore } from "@/stores/map/useMapPageStore";
import { useMapGroupStore } from "@/stores/map/useMapGroupStore";
import { useMapFavoriteStore } from "@/stores/map/useMapFavoriteStore";

export function GroupsFavoriteList() {
  const { groupInfo } = useMapGroupStore();
  const { page, otherUserId, setPageGroupList } = useMapPageStore();
  const { setFavoriteList } = useMapFavoriteStore();
  const { data: profile } = useProfile(otherUserId);

  // 이전 버튼 클릭 시 이전 데이터 초기화 및 페이지 전환
  function onClickBackBtn() {
    setPageGroupList(otherUserId!);
    setFavoriteList([]); // 데이터 초기화
  }

  if (page === PAGE.FAVORITELIST)
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
          <div className="text-sm font-medium text-gray-600">즐겨찾기 목록</div>
          <div className="w-6" />
        </div>

        <div className="flex gap-4 justify-center items-center py-4 border-b">
          <Link
            href={`/profile/${otherUserId}`}
            className="flex items-center gap-2"
          >
            <Image
              src={getProfileImageUrl(profile?.profileImage || null)}
              alt="프로필 이미지"
              width="40"
              height="40"
              className="rounded-full border-1 border-gray200 flex-shrink-0 bg-red-600 aspect-square"
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

        <div className="flex flex-col justify-center items-center p-4">
          <span className="font-bold">{groupInfo?.name}</span>
          <span className="text-xs text-gray600">
            장소 {groupInfo?.groupFavoriteCount}
          </span>
        </div>

        <FavoriteList />
      </div>
    );
}
