"use client";
import { CommentResponse } from "@/types/comment";
import React from "react";
import CommentListItem from "./CommentListItem";
import IconButton from "@/components/common/Button/IconButton";
import { RefreshCwIcon } from "lucide-react";

// TODO: 지우기
const dummy: CommentResponse = {
  content: [
    {
      id: 1,
      content: "너무 좋네요!!",
      nickname: "test003",
      profileImage: null,
      liveAloneDate: null,
      createdAt: "2025-05-29T12:07:11.013407",
      updatedAt: "2025-05-29T12:07:11.013443",
      isEdited: false,
      isMine: true,
      mentionedUser: null,
    },
  ],
  totalPages: 1,
  number: 0,
};

const CommentList = () => {
  const handleRefresh = () => {
    console.log("refresh");
  };

  return (
    <div className="flex flex-col mt-4 pt-4 border-t">
      <div className="flex justify-between pr-2">
        <p className="text-md font-bold">댓글 목록</p>
        <IconButton
          icon={<RefreshCwIcon className="w-5 h-5" />}
          label="refresh"
          isTransparent
          onClick={handleRefresh}
        />
      </div>
      <ul className="flex flex-col mx-2 py-2">
        {dummy.content.map((comment, index) => (
          <li key={comment.id}>
            <CommentListItem
              key={comment.id}
              item={comment}
              isLast={index === dummy.content.length - 1}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
