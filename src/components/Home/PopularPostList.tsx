"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { HeartIcon, MessageCircle } from "lucide-react";
import { fetchPopularPosts, RankedPostResponseItem, getChangedPostIds, normalizePosts,getTop5Posts } from "@/lib/api/popular";
import { motion } from "framer-motion";

export default function PopularPostList() {
  const [posts, setPosts] = useState<RankedPostResponseItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [changedPostIds, setChangedPostIds] = useState<number[]>([]);
  const prevPostsRef = useRef<RankedPostResponseItem[]>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    async function updatePosts() {
      const serverPosts = await fetchPopularPosts();
      const top5Posts  = getTop5Posts(normalizePosts(serverPosts));

      if (isFirstRender.current) {
        setPosts(top5Posts);
        setIsLoading(false);
        prevPostsRef.current = top5Posts;
        isFirstRender.current = false;
        return;
      }
      const changedIds = getChangedPostIds(top5Posts, prevPostsRef.current)

      setChangedPostIds(changedIds);
      setPosts(top5Posts);
      setIsLoading(false);
      prevPostsRef.current = top5Posts;
    }

    updatePosts();
    const interval = setInterval(updatePosts, 3000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return null;

  return (
    <div className="p-4">
      <div className="mt-[-12px]">
        <span className="inline-block px-2 border border-red-200 bg-red-50 text-red500 text-xs font-medium rounded-md mb-1">
          🔥 주간 인기
        </span>
        <h2 className="text-xl font-bold mb-1">주간 인기 게시글</h2>
      </div>

      <ul className="flex flex-col justify-between h-full space-y-2">
        {posts.map((post) => {
          const isChanged = changedPostIds.includes(post.postId);
          return (
            <motion.li
              key={post.postId}
              layout
              layoutId={`post-${post.postId}`}
              animate={{
                backgroundColor: isChanged ? "#F3E9FF" : "#FFFFFF",
                boxShadow: isChanged ? "0 0 10px #744CEB" : "none",
              }}
              whileHover={{
                backgroundColor: isChanged ? "#FFFFFF" : "#EBECEF66",
                transition: { duration: 0 },
              }}
              transition={{
                backgroundColor: { duration: 0.2, ease: "easeInOut" },
                boxShadow: { duration: 0.2 },
              }}
              onClick={() =>
                router.push(`/board/${post.category}/${post.postId}`)
              }
              className="py-1.5 px-1 rounded-md cursor-pointer transition-all duration-500 ease-in-out"
            >
              <div className="flex items-center">
                <span className="text-base font-semibold truncate hover:underline">
                  {post.title}
                </span>
              </div>
              <div className="flex justify-end items-center gap-2 text-sm text-gray600">
                <div className="flex items-center gap-1">
                  <HeartIcon className="w-4 h-4 text-gray600" />
                  {post.likeCount}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4 text-gray600" />
                  {post.commentCount}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}