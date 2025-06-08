"use client";

import { useEffect, useState } from "react";


interface Post{
  id:number;
  title:string;
  likeCount:number;
  commentCount: number;
}

export default function PopularPostList() {
  const [posts, setPosts] = useState<Post[]>([]);

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
    <div className="p-4 bg-white rounded-xl">
      <div>
        <h5 className="bg-white rounded-xl">🔥 실시간 인기</h5>
      </div>
      <h2 className="text-xl font-bold mb-4">실시간 인기 게시글</h2>

      <div className="flex flex-col space-y-3 justify-between">
        {posts.slice(0,5).map((post) => (
          <div
            key={post.id}
            className="px-4 py-2 min-h-[64px] hover:bg-gray-50 flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-sm">🔺</span>
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