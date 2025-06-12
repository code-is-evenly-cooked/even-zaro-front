"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFavoriteGroups } from "@/hooks/useFavorite";
import type { FavoriteGroupType } from "@/types/favorite";
import { createFavoriteGroup } from "@/lib/api/favorite";
import FavoriteGroupCard from "@/components/Favorite/FavoriteGroupCard";
import LoadingSpinnerBoundary from "../common/LoadingSpinner/LoadingSpinnerBoundary";
import AppErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import FallbackMessage from "../common/Fallback/FallbackMessage";
import AddFavoriteGroupModal from "./AddFavoriteGroupModal";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";

export default function FavoriteGroupList() {
  const { user } = useAuthStore();
  const userId = user?.userId ?? null;

  const { data: groups, isLoading } = useFavoriteGroups(userId);
  const [groupList, setGroupList] = useState<FavoriteGroupType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToastMessage } = useToastMessageContext();

  // 초기 값을 setGroupList를 통해 useState 로 저장
  useEffect(() => {
    if (groups) setGroupList(groups);
  }, [groups]);

  const handleDeleteGroup = (groupId: number) => {
    setGroupList((prev) => prev.filter((group) => group.groupId !== groupId));
  };

  if (isLoading) return <LoadingSpinnerBoundary />;

  if (!groupList || groupList.length === 0)
    return (
      <FallbackMessage message="즐겨찾기 그룹이 없습니다." className="mt-10" />
    );

  // 즐겨찾기 그룹 추가
  const handleCreateGroup = async (name: string) => {
    try {
      const newGroup = await createFavoriteGroup(name);
      setGroupList((prev) => [...prev, newGroup]);
    } catch (e) {
      console.error("그룹 생성 실패", e);
      showToastMessage({
        message: "그룹 생성에 실패했습니다.",
        type: "error",
      });
    }
  };

  return (
    <AppErrorBoundary fallbackMessage="즐겨찾기 그룹을 불러오는 중 오류가 발생했습니다.">
      <div className="space-y-2">
        {/* 그룹 추가 버튼 */}
        <div className="flex justify-end mb-2">
          <button onClick={() => setIsModalOpen(true)} className="text-gray900">
            + 그룹 추가
          </button>
        </div>

        {/* 즐겨찾기 그룹 리스트 */}
        <ul className="space-y-2">
          {groupList.map((group) => (
            <li key={group.groupId}>
              <FavoriteGroupCard group={group} onDelete={handleDeleteGroup} />
            </li>
          ))}
        </ul>

        <AddFavoriteGroupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateGroup}
        />
      </div>
    </AppErrorBoundary>
  );
}
