"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeartIcon, MessageCircle } from "lucide-react";
import { fetchPopularPosts, RankedPostResponseItem } from "@/lib/api/popular";

export default function PopularPostList() {
  const [posts, setPosts] = useState<RankedPostResponseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function updatePosts() {
      const serverPosts = await fetchPopularPosts();
      setPosts(serverPosts);
      setIsLoading(false);
    }
    updatePosts();
  }, []);

  if (isLoading) return null;

  return (
    <div className="p-4">
      <div className="mt-[-12px]">
        <span className="inline-block px-2 py-[2px] border border-red-200 bg-red-50 text-red-500 text-xs font-medium rounded-md mb-1">
          🔥 주간 인기
        </span>
        <h2 className="text-xl font-bold mb-4">주간 인기 게시글</h2>
      </div>

      <div className="flex flex-col justify-between h-full">
        {posts
          .filter(post => post.postId !== undefined && post.postId !== null)
          .slice(0, 5)
          .map((post) => (
            <div
              key={post.postId}
              onClick={() => router.push(`/board/${post.category}/${post.postId}`)}
              className="py-2 hover:bg-gray-50 rounded-md cursor-pointer transition-all duration-500 ease-in-out px-1"
            >
              <div className="flex items-center">
                <span className="text-base font-semibold truncate">{post.title}</span>
              </div>
              <div className="flex justify-end items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <HeartIcon className="w-4 h-4" />
                  {post.likeCount}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {post.commentCount}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}