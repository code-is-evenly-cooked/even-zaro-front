"use client";

import { client } from "@/lib/fetch/client";
import { FormEvent, useState } from "react";

interface CommentInputProps {
  postId: number;
  isReply: boolean;
  onSuccess: () => void;
}

const CommentInput = ({ postId, onSuccess }: CommentInputProps) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await client(`/posts/${postId}/comments`, {
      method: "POST",
      needAuth: true,
      body: JSON.stringify({ content: comment, mentionedNickname: "" }),
    });

    setComment("");
    onSuccess();
  };

  return (
    <div className="w-full border rounded-xl flex flex-col gap-3 p-4">
      <p className="px-2 font-semibold ">댓글 쓰기</p>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요"
          className="w-full h-24 p-3 bg-gray100 rounded-b-xl overflow-y-auto resize-none focus:outline-none
          focus:ring-0 text-md"
        />
        <button
          type="submit"
          color="violet300"
          className="self-end text-gray900 bg-violet300 hover:bg-violet300/80 px-4 py-2 rounded-lg"
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default CommentInput;

/**
 * TODO
 * 답글 기능일때 UI를 어떻게 표시할것인가?
 */
