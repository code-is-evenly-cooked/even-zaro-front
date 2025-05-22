import { fetchPostDetail } from "@/lib/api/post";
import PostHeader from "@/components/post/PostHeader";

export default async function PostDetailPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await fetchPostDetail(params.postId);

  return (
    <main className="px-6 py-10">
      <PostHeader
        category={post.data.category}
        tag={post.data.tag}
        title={post.data.title}
        createdAt={post.data.createdAt}
      />
    </main>
  );
}
