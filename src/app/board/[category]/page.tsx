import PostListHeaderSection from "@/components/PostList/PostListHeaderSection";
import PostListPagination from "@/components/PostList/PostListPagination";
import PostListResult from "@/components/PostList/PostListResult";
import { server } from "@/lib/fetch/server";
import { MainCategory } from "@/types/category";
import { PostDetailResponse } from "@/types/post";
import { isMainCategory } from "@/utils/category";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ tag?: string; page?: string }>;
}

export default async function PostListPage({
  params,
  searchParams,
}: PageProps) {
  const { category } = await params;
  const { tag, page } = await searchParams;

  if (!isMainCategory(category)) {
    notFound();
  }
  const categoryKey = category as MainCategory;
  const posts = await server<PostDetailResponse>(`/posts`, {
    needAuth: true,
    params: { category, ...(tag ? { tag } : {}), page: Number(page) || 0 },
  });

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <PostListHeaderSection category={categoryKey} />
      <PostListResult
        category={categoryKey}
        initialData={{
          content: posts.content,
          totalPages: posts.totalPages,
          number: posts.number,
        }}
      />
      <PostListPagination
        currentPage={posts.number}
        totalPage={posts.totalPages}
      />
    </div>
  );
}
