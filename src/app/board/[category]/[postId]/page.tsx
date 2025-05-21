import { fetchPostDetail } from "@/lib/api/post";

export default async function PostDetailPage({ params }: { params: { postId: string } }) {
    const post = await fetchPostDetail(params.postId);

  return (
    <main className="px-6 py-10">
      <h1 className="text-2xl font-bold">{post.data.title}</h1>
      <p className="text-sm text-gray-500">{post.data.user.nickname}</p>
    </main>
  );
}