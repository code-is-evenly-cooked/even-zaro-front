import { fetchPostDetail } from "@/lib/api/post";
import PostHeader from "@/components/post/PostHeader";
import PostAuthor from "@/components/post/PostAuthor";
import PostFooterWithFloating from "@/components/post/PostFooterWithFloating";
import ClientPostContent from "./PostPageClient";
import CommentList from "@/components/post/Comment/CommentList";
import type { MainCategory } from "@/types/category";

export default async function Page({
  params,
}: {
  params: { postId: string; category: string };
}) {
  const { postId } = params;
  const post = await fetchPostDetail(postId);
  const categoryKey = post.category as MainCategory;


  return (
    <main className="w-full max-w-3xl mx-auto px-2 py-10">
      <PostHeader
        category={categoryKey}
        tag={post.tag}
        title={post.title}
        createdAt={post.createdAt}
      />
      <PostAuthor
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
      />
      <CommentList />
    </main>
  );
}
