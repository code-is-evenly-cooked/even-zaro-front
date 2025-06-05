import {
  fetchUserComments,
  fetchUserLikes,
  fetchUserPosts,
} from "@/lib/api/profile";
import { PostDetailResponse } from "@/types/post";
import { ProfileTabType } from "@/types/profile";
import { useSuspenseQuery } from "@tanstack/react-query";

interface userProfilePostListProps {
  userId: number;
  type: ProfileTabType;
}

export const useProfileItemList = ({
  userId,
  type,
}: userProfilePostListProps) => {
  const queryKey = ["profile", userId, type];

  const queryFn = () => {
    switch (type) {
      case "posts":
        return fetchUserPosts(userId);
      case "comments":
        return fetchUserComments(userId);
      case "likes":
        return fetchUserLikes(userId);
      default:
        throw new Error("지원하지 않는 타입입니다.");
    }
  };

  return useSuspenseQuery<PostDetailResponse>({ queryKey, queryFn });
};
