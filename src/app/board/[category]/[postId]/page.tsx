import { cookies } from "next/headers";

export default async function PostDetailPage({ params }: { params: { postId: string } }) {
  const { postId } = params;

  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${postId}`, {
    cache: "no-store",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (!res.ok) {
    return notFound();
  }

  const data = await res.json();

  return (
    <main className="px-6 py-10">
      <h1 className="text-2xl font-bold">{data.data.title}</h1>
      <p className="text-sm text-gray-500">{data.data.user.nickname} · {data.data.createdAt}</p>
    </main>
  );
}
