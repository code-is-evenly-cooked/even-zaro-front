import React from "react";
import { FollowModalType } from "./UserFollowModal";
import { useSuspenseQuery } from "@tanstack/react-query";
import FallbackMessage from "@/components/common/Fallback/FallbackMessage";
import { getFollowers, getFollowings, FollowUser } from "@/lib/api/follow";
import UserFollowItem from "./UserFollowItem";

interface UserFollowListProps {
  userId: string;
  type: FollowModalType;
}

const UserFollowList = ({ userId, type }: UserFollowListProps) => {
  const queryFn = type === "follower" ? getFollowers : getFollowings;

  const { data } = useSuspenseQuery<FollowUser[]>({
    queryKey: ["follow", userId, type],
    queryFn: () => queryFn(userId),
  });

  if (data.length === 0) {
    return (
      <FallbackMessage
        message={`${type === "follower" ? "팔로워가" : "팔로잉이"} 없습니다.`}
      />
    );
  }
  return (
    <ul className="flex flex-col pt-1 space-y-3 overflow-y-auto max-h-[300px]">
      {data.map((user) => (
        <UserFollowItem key={user.userId} item={user} />
      ))}
    </ul>
  );
};

export default UserFollowList;
