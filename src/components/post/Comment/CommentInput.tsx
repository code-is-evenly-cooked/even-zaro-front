"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { createComment } from "@/lib/api/comment";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { useCommentReplyStore } from "@/stores/useCommentReply";
import {
  extractMentionedNickname,
  limitTextLength,
  MAX_COMMENT_LENGTH,
  removeMentionPrefix,
} from "@/utils/comment";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface CommentInputProps {
  postId: number;
  onSuccess: () => void;
}

const CommentInput = ({ postId, onSuccess }: CommentInputProps) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { replyTo, resetReplyTarget } = useCommentReplyStore();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { showToastMessage } = useToastMessageContext();

  const mention = useMemo(() => (replyTo ? `@${replyTo} ` : ""), [replyTo]);

  useEffect(() => {
    if (replyTo) setComment(mention);
    setTimeout(() => {
      const length = mention.length;
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(length, length);
    }, 0);
  }, [replyTo]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = limitTextLength(e.target.value);
    const cursorPos = e.target.selectionStart;

    // mention이 있고, 커서가 mention안에 있고, 삭제중이면 전체 mention제거
    if (
      replyTo &&
      comment.startsWith(mention) &&
      cursorPos <= mention.length &&
      newValue.length < comment.length
    ) {
      setComment(removeMentionPrefix(newValue));
      resetReplyTarget();
    } else {
      setComment(newValue);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const replyNickname = extractMentionedNickname(comment);
    setIsLoading(true);
    try {
      await createComment({
        postId,
        content: comment,
        mentionedNickname: replyNickname,
      });
      setComment("");
      resetReplyTarget();
      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "댓글 쓰기 중 오류가 발생했습니다.";
      showToastMessage({ type: "error", message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full border rounded-xl flex flex-col gap-3 p-4">
      <div className="flex justify-between items-end pr-1">
        <p className="px-2 font-semibold ">댓글 쓰기</p>
        <span className="text-gray600 text-sm">
          {comment.length} / {MAX_COMMENT_LENGTH}
        </span>
      </div>
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
          disabled={isLoading || !comment.trim()}
          className="self-end text-gray900 bg-violet300 hover:bg-violet300/80 disabled:bg-gray200 disabled:text-white  px-4 py-2 rounded-lg font-semibold"
        >
          {isLoading ? <LoadingSpinner className="px-4 py-2" /> : "등록"}
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
