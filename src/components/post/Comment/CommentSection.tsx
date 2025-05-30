"use client";
import React, { useState } from "react";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { useQuery } from "@tanstack/react-query";
import { fetchComment } from "@/lib/api/comment";

interface CommentSectionProps {
  postId: number;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [page, setPage] = useState(0);
  const { data, refetch } = useQuery({
    queryKey: ["comments", postId, page],
    queryFn: () => fetchComment({ postId, page }),
  });

  const comments = data?.content ?? [];

  return (
    <section>
      <CommentList comments={comments} refresh={refetch} />
      <CommentInput />
    </section>
  );
};

export default CommentSection;
