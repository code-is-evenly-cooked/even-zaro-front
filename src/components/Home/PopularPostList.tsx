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

interface RankdPost extends Post {
  rankChange: number;
}

export default function PopularPostList() {
  const [posts, setPosts] = useState<RankdPost[]>([]);
  const prevPostIdRef = useRef<number[]>([]);

  useEffect(() => {

    const dummyPosts: Post[] = [
      { id: 1, title: "빨래건조는 이렇게 해보세요오오오오오오오오오오", likeCount: 15, commentCount: 3 },
      { id: 2, title: "나 이렇게 자취했더니 대박", likeCount: 10, commentCount: 2 },
      { id: 3, title: "3번째 제목", likeCount: 9, commentCount: 2 },
      { id: 4, title: "4번째 제목", likeCount: 9, commentCount: 1 },
      { id: 5, title: "5번째 제목", likeCount: 5, commentCount: 2 },
    ];

    setPosts(dummyPosts);
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
                { post.rankChange > 0 ? <RankUpIcon className="w-[14px] h-[14px]"/>
                : post.rankChange < 0 ? <RankDownIcon className="w-[14px] h-[14px]"/>
                : null }
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