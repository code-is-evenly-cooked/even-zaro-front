import { ProfileTabType } from "@/types/profile";
import BookmarkGroupList from "../BookmarkGroupList";
import React, { Suspense } from "react";
import ProfilePostList from "../ProfilePostList";
import LoadingSpinnerBoundary from "@/components/common/LoadingSpinner/LoadingSpinnerBoundary";
import AppErrorBoundary from "@/components/common/ErrorBoundary/ErrorBoundary";

interface Props {
  activeTab: ProfileTabType;
}

export default function ProfileTabContent({ activeTab }: Props) {
  let content: React.ReactNode;

  switch (activeTab) {
    case "posts":
    case "comments":
    case "likes":
      content = (
        <AppErrorBoundary
          fallbackMessage="프로필 정보를 불러오는 중 오류가 발생했습니다."
          key={activeTab}
        >
          <Suspense fallback={<LoadingSpinnerBoundary />}>
            <ProfilePostList type={activeTab} />
          </Suspense>
        </AppErrorBoundary>
      );
      break;
    case "bookmarks":
      content = <BookmarkGroupList />;
      break;
    default:
      content = null;
      break;
  }

  return <div className="mt-4">{content}</div>;
}
