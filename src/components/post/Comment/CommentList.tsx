import { CommentResponse } from "@/types/comment";
import React from "react";
import CommentListItem from "./CommentListItem";

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
  return (
    <div className="flex flex-col mt-4 pt-4 border-t">
      <div>
        <p className="text-md font-bold">댓글 목록</p>
      </div>
      <ul className="flex flex-col mx-2 py-2">
        {dummy.content.map((comment) => (
          <li key={comment.id}>
            <CommentListItem key={comment.id} item={comment} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
