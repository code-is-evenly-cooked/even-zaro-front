"use client";

import { client } from "@/lib/fetch/client";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

interface CommentInputProps {
  postId: number;
  replyNickname?: string;
  onSuccess: () => void;
}

const CommentInput = ({
  postId,
  replyNickname,
  onSuccess,
}: CommentInputProps) => {
  const [comment, setComment] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const mention = replyNickname ? `@${replyNickname} ` : "";

  useEffect(() => {
    if (replyNickname) setComment(mention);
  }, [replyNickname]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart;

    // mention이 있고, 커서가 mention안에 있고, 삭제중이면 전체 mention제거
    if (
      replyNickname &&
      comment.startsWith(mention) &&
      cursorPos <= mention.length &&
      newValue.length < comment.length
    ) {
      setComment("");
    } else {
      setComment(newValue);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await client(`/posts/${postId}/comments`, {
      method: "POST",
      needAuth: true,
      body: JSON.stringify({
        content: comment,
        mentionedNickname:
          replyNickname && comment.startsWith(`@${replyNickname}`)
            ? replyNickname
            : "",
      }),
    });

    setComment("");
    onSuccess();
  };

  return (
    <div className="w-full border rounded-xl flex flex-col gap-3 p-4">
      <p className="px-2 font-semibold ">댓글 쓰기</p>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          value={comment}
          onChange={handleChange}
          placeholder="댓글을 입력하세요"
          className="w-full h-24 p-3 bg-gray100 rounded-b-xl overflow-y-auto resize-none focus:outline-none
          focus:ring-0 text-md"
        />
        <button
          type="submit"
          className="self-end text-gray900 bg-violet300 hover:bg-violet300/80 px-4 py-2 rounded-lg font-semibold"
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
 * 글자 제한
 * 수정...
 */
