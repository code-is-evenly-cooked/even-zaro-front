import { fetchPostDetail } from "@/lib/api/post.server";
import PostHeader from "@/components/post/PostHeader";
import PostAuthor from "@/components/post/PostAuthor";
import PostFooterWithFloating from "@/components/post/PostFooterWithFloating";
import ClientPostContent from "./PostPageClient";
import CommentSection from "@/components/post/Comment/CommentSection";

interface PageProps {
  params: Promise<{ postId: string; category: string }>;
}

export default async function Page({ params }: PageProps) {
  const { postId } = await params;
  const post = await fetchPostDetail(postId);
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
        liveAloneDate={"2024-01-01"} // 자취 시작 일 임시 고정 {post.data.user.liveAloneDate}
        authorUserId={post.user.userId}
      />
      <ClientPostContent content={post.content} />
      <PostFooterWithFloating
        postId={post.postId}
        likeCount={post.likeCount}
        commentCount={post.commentCount}
        authorUserId={post.user.userId}
      />
      <CommentSection postId={post.postId} />
    </main>
  );
}
