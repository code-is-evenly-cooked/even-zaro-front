import { PROFILE_TAB_MAP, ProfileTabType } from "@/types/profile";
import { useProfileItemList } from "../../hooks/useProfileItemList";
import PostListCard from "../common/SectionCards/PostListCard";
import FallbackMessage from "../common/Fallback/FallbackMessage";
import Link from "next/link";
import { useState } from "react";
import ClientSidePagination from "../common/Pagination/ClientSidePagination";
import { useParams } from "next/navigation";

interface ProfilePostListProps {
  type: Exclude<ProfileTabType, "favorites">;
}

const ProfilePostList = ({ type }: ProfilePostListProps) => {
  const params = useParams();
  const userId = params?.userId as string;

  const [currentPage, setCurrentPage] = useState(0);

  const { data: posts } = useProfileItemList({
    userId: userId,
    type,
    page: currentPage,
  });

  const isEmpty = posts?.content.length === 0;
  const label = PROFILE_TAB_MAP[type];
  return isEmpty ? (
    <FallbackMessage
      message={`${label} 게시글이 없습니다.`}
      className="mt-10"
    />
  ) : (
    <div className="flex flex-col">
      <ul>
        {posts.content.map((post) => (
          <li key={post.postId}>
            <Link href={`/board/${post.category}/${post.postId}`}>
              <PostListCard post={post} />
            </Link>
          </li>
        ))}
      </ul>
      <ClientSidePagination
        currentPage={currentPage}
        totalPage={posts.totalPages}
        onChangePage={setCurrentPage}
      />
    </div>
  );
};
export default ProfilePostList;
