import PostImageCard from "@/components/common/SectionCards/PostImageCard";
import PostListCard from "@/components/common/SectionCards/PostListCard";
import PostListComponent from "@/components/PostList/PostListComponent";
import { convertDetailToImagePostItem } from "@/lib/adapters/normalizePost";
import { server } from "@/lib/fetch/server";
import { MainCategory } from "@/types/category";
import { PostDetailResponse } from "@/types/post";
import { isMainCategory } from "@/utils/category";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function PostListPage({ params }: PageProps) {
  const { category } = await params;

  if (!isMainCategory(category)) {
    notFound();
  }
  const categoryKey = category as MainCategory;
  const posts = await server<PostDetailResponse>(`/posts`, {
    needAuth: true,
    params: { category: category },
  });

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <PostListComponent category={categoryKey} />
      {categoryKey === "RANDOM_BUY" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6 pt-4">
          {posts.content.map((post) => (
            <Link href={`/board/${category}/${post.postId}`} key={post.postId}>
              <PostImageCard
                key={post.postId}
                {...convertDetailToImagePostItem(post)}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col pt-4">
          {posts.content.map((post) => (
            <Link href={`/board/${category}/${post.postId}`} key={post.postId}>
              <PostListCard key={post.postId} post={post} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
