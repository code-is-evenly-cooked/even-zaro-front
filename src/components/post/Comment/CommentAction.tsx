"use client";

import IconButton from "@/components/common/Button/IconButton";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { useCommentLoadingStore } from "@/stores/useCommentLoadingStore";
import { MoreVerticalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type CommentActionType = "edit" | "delete" | "reply" | "report";

interface CommentActionProps {
  isMine: boolean;
  onAction: (action: CommentActionType) => void;
}

const CommentAction = ({ isMine, onAction }: CommentActionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { deletingId } = useCommentLoadingStore();
  const isDeleting = deletingId !== null;

  const handleClickItem = (action: CommentActionType) => {
    setIsOpen(false);
    onAction(action);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {isDeleting ? (
        <LoadingSpinner />
      ) : (
        <IconButton
          icon={<MoreVerticalIcon />}
          label={"메뉴"}
          isTransparent
          onClick={() => setIsOpen((prev) => !prev)}
        />
      )}

      {isOpen && (
        <div className="absolute right-2 top-8 bg-gray100 rounded-md shadow-md z-10 flex items-center justify-center text-nowrap">
          {isMine ? (
            <ul className="flex flex-col py-2">
              <li>
                <button
                  className="text-gray900 hover:underline hover:bg-gray600/10 pl-4 pr-8 py-1"
                  onClick={() => handleClickItem("edit")}
                >
                  수정
                </button>
              </li>
              <li>
                <button
                  className="text-gray900 hover:underline hover:bg-gray600/10 pl-4 pr-8 py-1"
                  onClick={() => handleClickItem("delete")}
                >
                  삭제
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col py-2">
              <li>
                <button
                  className="text-gray900 hover:underline hover:bg-gray600/10 pl-4 pr-8 py-1"
                  onClick={() => handleClickItem("reply")}
                >
                  답글
                </button>
              </li>
              <li>
                <button
                  className="text-gray900 hover:underline hover:bg-gray600/10 pl-4 pr-8 py-1"
                  onClick={() => handleClickItem("report")}
                >
                  신고
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentAction;
