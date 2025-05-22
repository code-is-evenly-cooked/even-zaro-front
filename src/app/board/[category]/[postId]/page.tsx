import { fetchPostDetail } from "@/lib/api/post";
import PostHeader from "@/components/post/PostHeader";
import PostContent from "@/components/post/PostContent";
import PostAuthor from "@/components/post/PostAuthor";

export default async function PostDetailPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await fetchPostDetail(params.postId);

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
        profileImageUrl={post.data.user.profileImageUrl}
      />
      <PostContent content={post.data.content} />
    </main>
  );
}
