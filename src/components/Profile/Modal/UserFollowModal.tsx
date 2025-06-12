import BaseModal from "@/components/common/Modal/BaseModal";
import React, { Suspense } from "react";
import UserFollowList from "./UserFollowList";
import LoadingSpinnerBoundary from "@/components/common/LoadingSpinner/LoadingSpinnerBoundary";

export type FollowModalType = "follower" | "following";

interface UserFollowModalProps {
  userId: string;
  type: FollowModalType;
  isOpen: boolean;
  onClose: () => void;
}

const UserFollowModal = ({
  userId,
  type,
  isOpen,
  onClose,
}: UserFollowModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-2 min-h-36">
        <span className="border-b border-gray-200 pb-2 font-bold">
          {type === "follower" ? "팔로워" : "팔로잉"}
        </span>
        <Suspense fallback={<LoadingSpinnerBoundary />}>
          <UserFollowList userId={userId} type={type} />
        </Suspense>
      </div>
    </BaseModal>
  );
};

export default UserFollowModal;
