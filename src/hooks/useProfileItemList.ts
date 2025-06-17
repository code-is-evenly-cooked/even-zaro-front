"use client";

import {
  fetchUserComments,
  fetchUserLikes,
  fetchUserPosts,
} from "@/lib/api/profile";
import { APIErrorResponse } from "@/types/api";
import { PostDetailResponse, UserCommentedResponse } from "@/types/post";
import { ProfileTabType } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

interface userProfilePostListProps {
  userId: string;
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
    const accessToken = getCookie("access_token");

    if (!accessToken) {
      throw new APIErrorResponse({
        code: "NO_ACCESS_TOKEN",
        message: "access token 없음",
        statusCode: 401,
      });
    }
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

  return useQuery<PostDetailResponse | UserCommentedResponse>({
    queryKey,
    queryFn,
    retry: false,
  });
};
