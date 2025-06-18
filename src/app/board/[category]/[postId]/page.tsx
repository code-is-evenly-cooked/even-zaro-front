import { fetchPostDetail } from "@/lib/api/post.server";
import PostHeader from "@/components/post/PostHeader";
import PostAuthor from "@/components/post/PostAuthor";
import ClientPostContent from "./PostPageClient";
import PostFooterInteraction from "@/components/post/PostFooterInteraction";
import { isAPIErrorResponse } from "@/types/api";
import { notFound } from "next/navigation";
import { getMainCategoryTitle } from "@/utils/category";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ postId: string; category: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { postId } = await params;

  try {
    const post = await fetchPostDetail(postId);

    const categoryTitle = getMainCategoryTitle(post.category);

    return {
      title: `ZARO | ${post.title} | ${categoryTitle}`,
      description: `${post.user.nickname}님의 ${categoryTitle} 게시글: "${post.title}"`,
      openGraph: {
        title: post.title,
        description: post.content.slice(0, 100),
        url: `https://zaro.vercel.app/board/${post.category}/${postId}`,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.content.slice(0, 100),
      },
    };
  } catch (error) {
    if (isAPIErrorResponse(error) && error.statusCode === 404) {
      notFound();
    }
    throw error;
  }
}

export default async function Page({ params }: PageProps) {
  const { postId } = await params;
  let post;
  try {
    post = await fetchPostDetail(postId);
  } catch (error) {
    if (isAPIErrorResponse(error)) {
      if (error.statusCode === 404) return notFound();
    }
    throw error;
  }
  const categoryKey = post.category;

  return (
    <main className="w-full max-w-3xl mx-auto px-2 py-10">
      <PostHeader
        category={categoryKey}
        tag={post.tag}
        title={post.title}
        createdAt={post.createdAt}
      />
      <PostAuthor
        postId={post.postId}
        category={post.category}
        nickname={post.user.nickname}
        profileImage={post.user.profileImage}
        liveAloneDate={post.user.liveAloneDate}
        authorUserId={post.user.userId}
        following={post.user.following}
      />
      <ClientPostContent content={post.content} />
      <PostFooterInteraction
        postId={post.postId}
        initialLikeCount={post.likeCount}
        initialCommentCount={post.commentCount}
        authorUserId={post.user.userId}
      />
    </main>
  );
}
