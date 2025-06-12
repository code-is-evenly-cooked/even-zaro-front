"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HeartIcon, MessageCircle } from "lucide-react";

interface RankedPost {
  id: number;
  title: string;
  likeCount: number;
  commentCount: number;
  baselineRankIndex: number;
  currentRankIndex: number;
  rankChange: number;
  displayedRankChange: number;
  category?: string;
}

async function fetchPopularPosts(): Promise<RankedPost[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/rank`);
    const data = await response.json();

    return data.data.posts.map((post: any) => ({
      id: post.postId,
      title: post.title,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      baselineRankIndex: post.baselineRankIndex,
      currentRankIndex: post.currentRankIndex,
      rankChange: post.rankChange,
      displayedRankChange: post.rankChange,
      category: post.category,
    }));
  } catch (error) {
    console.log("Error fetching popular posts: ", error);
    return [];
  }
}

export default function PopularPostList() {
  const [posts, setPosts] = useState<RankedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    async function updatePosts() {
      const serverPosts = await fetchPopularPosts();
      setPosts(serverPosts);
      setIsLoading(false);
    }

    updatePosts();

    interval = setInterval(updatePosts, 300000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
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
          .filter(post => post.id !== undefined && post.id !== null)
          .slice(0, 5)
          .map((post) => (
            <div
              key={post.id}
              onClick={() => router.push(`/board/${post.category}/${post.id}`)}
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