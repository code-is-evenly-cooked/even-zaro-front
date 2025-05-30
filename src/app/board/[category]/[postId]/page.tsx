import { fetchPostDetail } from "@/lib/api/post";
import PostHeader from "@/components/post/PostHeader";
import PostContent from "@/components/post/PostContent";
import PostAuthor from "@/components/post/PostAuthor";
import PostFooterWithFloating from "@/components/post/PostFooterWithFloating";
import CommentList from "@/components/post/Comment/CommentList";
import CommentInput from "@/components/post/Comment/CommentInput";

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string; category: string }>;
}) {
  const { postId } = await params;
  const post = await fetchPostDetail(postId);

  return (
    <main className="w-full max-w-3xl mx-auto px-2 py-10">
      <PostHeader
        category={post.data.category}
        tag={post.data.tag}
        title={post.data.title}
        createdAt={post.data.createdAt}
      />
      <PostAuthor
        nickname={post.data.user.nickname}
        profileImage={post.data.user.profileImage}
        liveAloneDate={"2024-01-01"} // 자취 시작 일 임시 고정 {post.data.user.liveAloneDate}
        authorUserId={post.data.user.userId}
      />
      <PostContent content={post.data.content} />
      <PostFooterWithFloating
        postId={post.data.postId}
        likeCount={post.data.likeCount}
        commentCount={post.data.commentCount}
      />
      <CommentList />
      <CommentInput />
    </main>
  );
}
