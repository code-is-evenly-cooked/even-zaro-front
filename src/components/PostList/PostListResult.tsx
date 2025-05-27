"use client";

import { fetchPosts } from "@/lib/api/posts";
import { MainCategory, SubCategoryValue } from "@/types/category";
import { ImagePostDetailItem, PostDetailResponse } from "@/types/post";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import FallbackMessage from "../common/Fallback/FallbackMessage";
import Link from "next/link";
import PostImageCard from "../common/SectionCards/PostImageCard";
import PostListCard from "../common/SectionCards/PostListCard";

interface PostListResultProps {
  category: MainCategory;
  initialData: PostDetailResponse;
}

const PostListResult = ({ category, initialData }: PostListResultProps) => {
  const searchParams = useSearchParams();

  const tag = searchParams.get("tag") as SubCategoryValue | null;
  const page = Number(searchParams.get("page") || 0);

  const { data } = useQuery<PostDetailResponse>({
    queryKey: ["posts", category, tag, page],
    queryFn: () => fetchPosts({ category, tag: tag ?? undefined, page }),
    initialData: initialData,
  });

  const posts = data.content ?? [];
  const isEmpty = posts.length === 0;

  if (isEmpty) {
    return (
      <FallbackMessage
        message="아직 작성된 게시글이 없습니다."
        className="mt-10"
      />
    );
  }

  return category === "RANDOM_BUY" ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6 pt-4">
      {(posts as ImagePostDetailItem[]).map((post) => (
        <Link href={`/board/${category}/${post.postId}`} key={post.postId}>
          <PostImageCard {...post} />
        </Link>
      ))}
    </div>
  ) : (
    <div className="flex flex-col pt-4">
      {posts.map((post) => (
        <Link href={`/board/${category}/${post.postId}`} key={post.postId}>
          <PostListCard post={post} />
        </Link>
      ))}
    </div>
  );
};

export default PostListResult;
