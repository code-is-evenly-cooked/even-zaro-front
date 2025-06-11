import { PROFILE_TAB_MAP, ProfileTabType } from "@/types/profile";
import { useProfileItemList } from "../../hooks/useProfileItemList";
import PostListCard from "../common/SectionCards/PostListCard";
import FallbackMessage from "../common/Fallback/FallbackMessage";
import Link from "next/link";
import { useState } from "react";
import ClientSidePagination from "../common/Pagination/ClientSidePagination";
import { useParams } from "next/navigation";
import { CommonPostDetailItem, UserCommentedItem } from "@/types/post";
import ProfileCommentCard from "./ProfileCommentCard";

interface ProfilePostListProps {
  type: Exclude<ProfileTabType, "favorites">;
}

const ProfilePostList = ({ type }: ProfilePostListProps) => {
  const params = useParams();
  const userId = params?.userId as string;

  const [currentPage, setCurrentPage] = useState(0);

  const { data } = useProfileItemList({
    userId: userId,
    type,
    page: currentPage,
  });

  const isEmpty = data?.content.length === 0;
  const label = PROFILE_TAB_MAP[type];
  return isEmpty ? (
    <FallbackMessage
      message={`${label} 게시글이 없습니다.`}
      className="mt-10"
    />
  ) : (
    <div className="flex flex-col">
      <ul>
        {type === "comments"
          ? (data.content as UserCommentedItem[]).map((comment) => (
              <li key={comment.postId}>
                <Link href={`/board/${comment.category}/${comment.postId}`}>
                  <ProfileCommentCard item={comment} />
                </Link>
              </li>
            ))
          : (data.content as CommonPostDetailItem[]).map((post) => (
              <li key={post.postId}>
                <Link href={`/board/${post.category}/${post.postId}`}>
                  <PostListCard post={post} />
                </Link>
              </li>
            ))}
      </ul>
      <ClientSidePagination
        currentPage={currentPage}
        totalPage={data.totalPages}
        onChangePage={setCurrentPage}
      />
    </div>
  );
};
export default ProfilePostList;
