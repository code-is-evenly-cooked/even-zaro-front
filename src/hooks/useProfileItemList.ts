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
  page: number;
}

export const useProfileItemList = ({
  userId,
  type,
  page,
}: userProfilePostListProps) => {
  const queryKey = ["profile", userId, type, page];

  const queryFn = () => {
    switch (type) {
      case "posts":
        return fetchUserPosts(userId, page);
      case "comments":
        return fetchUserComments(userId, page);
      case "likes":
        return fetchUserLikes(userId, page);
      default:
        throw new Error("지원하지 않는 타입입니다.");
    }
  };

  return useSuspenseQuery<PostDetailResponse>({ queryKey, queryFn });
};
