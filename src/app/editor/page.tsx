import PostEditor from "@/components/editor/PostEditor";

export default function WritePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">글쓰기</h1>
      <PostEditor />
    </main>
  );
}