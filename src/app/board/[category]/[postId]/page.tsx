import { fetchPostDetail } from "@/lib/api/post";
import PostHeader from "@/components/post/PostHeader";
import PostContent from "@/components/post/PostContent";

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
      <PostContent content={post.data.content} />
    </main>
  );
}
