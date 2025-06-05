import { ProfileTabType } from "@/types/profile";
import FavoriteGroupList from "@/components/Favorite/FavoriteGroupList";
import React, { Suspense } from "react";
import ProfilePostList from "../ProfilePostList";
import LoadingSpinnerBoundary from "@/components/common/LoadingSpinner/LoadingSpinnerBoundary";
import AppErrorBoundary from "@/components/common/ErrorBoundary/ErrorBoundary";

interface Props {
  activeTab: ProfileTabType;
}

export default function ProfileTabContent({ activeTab }: Props) {
  const isPostRelatedTab = ["posts", "comments", "likes"].includes(activeTab);

  if (isPostRelatedTab) {
    return (
      <div className="mt-4">
        <AppErrorBoundary
          fallbackMessage="프로필 정보를 불러오는 중 오류가 발생했습니다."
          key={activeTab}
        >
          <Suspense fallback={<LoadingSpinnerBoundary />}>
            <ProfilePostList
              type={activeTab as Exclude<ProfileTabType, "favorites">}
            />
          </Suspense>
        </AppErrorBoundary>
      </div>
    );
  }

  if (activeTab === "favorites") {
    return (
      <div className="mt-4">
        <FavoriteGroupList />
      </div>
    );
  }

  return null;
}
