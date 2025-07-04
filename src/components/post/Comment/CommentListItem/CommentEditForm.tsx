"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useCommentLoadingStore } from "@/stores/useCommentLoadingStore";
import { CommentItem } from "@/types/comment";
import { useEffect, useRef, useState } from "react";

interface CommentEditFormProps {
  item: CommentItem;
  onCancel: () => void;
  onSubmit: (content: string) => void;
}

const CommentEditForm = ({
  item,
  onCancel,
  onSubmit,
}: CommentEditFormProps) => {
  const [content, setContent] = useState(item.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { editingId } = useCommentLoadingStore();
  const isEditing = editingId === item.id;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.focus();
      // 커서를 텍스트 맨 뒤로 이동
      const len = textarea.value.length;
      textarea.setSelectionRange(len, len);
    }
  }, []);

  return (
    <div className="border p-2 flex flex-col rounded-md">
      <p className="font-semibold text-gray900 pt-1.5 pl-1.5">
        {item.nickname}
      </p>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-24 rounded-md p-2 resize-none focus:outline-none focus:ring-0"
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="self-end text-gray600 border border-violet300 hover:bg-gray200/80 px-4 py-2 rounded-lg font-semibold"
        >
          취소
        </button>
        <button
          type="button"
          disabled={!content}
          onClick={() => onSubmit(content)}
          className="self-end text-gray900 bg-violet300 hover:bg-violet300/80 disabled:bg-gray200 disabled:text-white px-4 py-2 rounded-lg font-semibold"
        >
          {isEditing ? <LoadingSpinner className="w-7 h-6" /> : "등록"}
        </button>
      </div>
    </div>
  );
};

export default CommentEditForm;
