import { useAuthStore } from "@/stores/useAuthStore";
import { PROFILE_TAB_MAP, ProfileTabType } from "@/types/profile";
import { useProfileItemList } from "../../hooks/useProfileItemList";
import PostListCard from "../common/SectionCards/PostListCard";
import FallbackMessage from "../common/Fallback/FallbackMessage";
import Link from "next/link";

interface ProfilePostListProps {
  type: Exclude<ProfileTabType, "bookmarks">;
}

const ProfilePostList = ({ type }: ProfilePostListProps) => {
  const { user } = useAuthStore();
  const userId = user?.userId;

  if (userId === null || userId === undefined) {
    throw new Error("로그인이 필요합니다");
  }

  const { data: posts } = useProfileItemList({
    userId: userId,
    type,
  });

  const isEmpty = posts?.content.length === 0;
  const label = PROFILE_TAB_MAP[type];
  return isEmpty ? (
    <FallbackMessage
      message={`${label} 게시글이 없습니다.`}
      className="mt-10"
    />
  ) : (
    <ul>
      {posts.content.map((post) => (
        <li key={post.postId}>
          <Link href={`/board/${post.category}/${post.postId}`}>
            <PostListCard post={post} />
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default ProfilePostList;
