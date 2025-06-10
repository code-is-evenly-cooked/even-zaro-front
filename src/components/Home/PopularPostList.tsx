"use client";

import { useEffect, useState, useRef } from "react";
import { RankUpIcon } from "@/components/common/Icons"
import { RankDownIcon } from "@/components/common/Icons"


interface Post{
  id:number;
  title:string;
  likeCount:number;
  commentCount: number;
}

interface RankedPost extends Post {
  rankChange: number | null;
}

interface PrevPostRank {
  postId: number;
  index: number;
  rankChange: number;
}

export default function PopularPostList() {
  const [posts, setPosts] = useState<RankedPost[]>([]);
  const prevPostRanksRef = useRef<PrevPostRank[]>([]);

  useEffect(() => {



    async function fetchPosts(){
      try{
        const savedPrevPostRanks = sessionStorage.getItem("prevPopularPostRanks");
        if (savedPrevPostRanks) {
          prevPostRanksRef.current = JSON.parse(savedPrevPostRanks);
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/rank`);
        const data = await response.json();

        const newPosts: Post[] = data.data.posts.map((post: any) => ({
          id: post.postId,
          title: post.title,
          likeCount: post.likeCount,
          commentCount: post.commentCount,
        }));


        const rankedPosts: RankedPost[] = newPosts.map((post, index) => {
          const prevRank = prevPostRanksRef.current.find(p => p.postId === post.id);
          let rankChange: number = 1;

          if (prevPostRanksRef.current.length === 0) {
            rankChange = 1;
          } else {
            if (prevRank) {
              if (prevRank.index !== index) {
                rankChange = prevRank.index - index;
              } else {
                rankChange = prevRank.rankChange;
              }
            } else {
              rankChange = 1;
            }
          }

          return {
            ...post,
            rankChange,
          };
        });

        setPosts(rankedPosts);

        const newPrevPostRanks: PrevPostRank[] = rankedPosts.map((post, index) => ({
          postId: post.id,
          index,
          rankChange: post.rankChange!,
        }));

        requestAnimationFrame(() => {
          prevPostRanksRef.current = newPrevPostRanks;
          sessionStorage.setItem("prevPopularPostRanks", JSON.stringify(newPrevPostRanks));
        });
      } catch (error) {
        console.log("Error popular posts : ", error);
      }
    }

    fetchPosts();

    const interval = setInterval(fetchPosts, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <div className="mt-[-12px]">
        <span className="inline-block px-2 py-[2px] border border-red-200 bg-red-50 text-red-500 text-xs font-medium rounded-md mb-1">
          🔥 주간 인기
        </span>
        <h2 className="text-xl font-bold mb-4">주간 인기 게시글</h2>
      </div>

      <div className="flex flex-col justify-between h-full">
        {posts.slice(0,5).map((post) => (
          <div
            key={post.id}
            className="px-4 py-2 hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <span className="text-sm">
                { post.rankChange !==null && post.rankChange > 0 ? (<RankUpIcon className="w-[14px] h-[14px]" />)
                  : post.rankChange !==null && post.rankChange < 0 ? (<RankDownIcon className="w-[14px] h-[14px]" />)
                      : null}
              </span>
              <span className="text-base font-semibold truncate">{post.title}</span>
            </div>
            <div className="flex justify-end gap-3 mt-1  text-sm text-gray-600">
              <span>♥ {post.likeCount}</span>
              <span>💬 {post.commentCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}