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
import LoadingSpinnerBoundary from "../common/LoadingSpinner/LoadingSpinnerBoundary";

interface PostListResultProps {
  category: MainCategory;
  initialData: PostDetailResponse;
}

const PostListResult = ({ category, initialData }: PostListResultProps) => {
  const searchParams = useSearchParams();

  const tag = searchParams.get("tag") as SubCategoryValue | null;
  const page = Number(searchParams.get("page") || 0);

  const { data, error, isError, isLoading } = useQuery<PostDetailResponse>({
    queryKey: ["posts", category, tag, page],
    queryFn: () =>
      fetchPosts({
        category,
        tag: tag ?? undefined,
        page,
        size: category === "RANDOM_BUY" ? 12 : 10,
      }),
    initialData: initialData,
  });

  if (isLoading) {
    return <LoadingSpinnerBoundary />;
  }

  if (isError) {
    if (error.message === "access token 없음") {
      return (
        <FallbackMessage
          message="로그인이 필요한 서비스입니다"
          className="mt-10"
        />
      );
    }

    return (
      <FallbackMessage
        message={error.message || "게시글을 불러오는 데 실패했습니다."}
        className="mt-10"
      />
    );
  }

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
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6 pt-4 mx-2">
      {(posts as ImagePostDetailItem[]).map((post) => (
        <li key={post.postId}>
          <Link href={`/board/${category}/${post.postId}`}>
            <PostImageCard {...post} />
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <ul className="flex flex-col pt-4 mx-4">
      {posts.map((post) => (
        <li key={post.postId}>
          <Link href={`/board/${category}/${post.postId}`}>
            <PostListCard post={post} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PostListResult;
