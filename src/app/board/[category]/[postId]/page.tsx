import { fetchPostDetail } from "@/lib/api/post";
import PostHeader from "@/components/post/PostHeader";
import PostContent from "@/components/post/PostContent";
import PostAuthor from "@/components/post/PostAuthor";
import PostFooter from "@/components/post/PostFooter";
import PostFooterWithFloating from "@/components/post/PostFooterWithFloating";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ params }: any) {
  const post = await fetchPostDetail(params.postId);
  console.log("✅ 게시글 응답 데이터:", post);

  return (
    <main className="w-full max-w-3xl mx-auto px-4 py-10">
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
      />
      <PostContent content={post.data.content} />
      <PostFooter
        postId={post.data.postId}
        likeCount={post.data.likeCount}
        commentCount={post.data.commentCount}
      />
      <PostFooterWithFloating
        postId={post.data.postId}
        likeCount={post.data.likeCount}
        commentCount={post.data.commentCount}
      />
    </main>
  );
}
