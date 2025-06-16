"use client";
import React, { useState } from "react";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchComment } from "@/lib/api/comment";
import ClientSidePagination from "@/components/common/Pagination/ClientSidePagination";
import { CommentResponse } from "@/types/comment";

interface CommentSectionProps {
  postId: number;
  onCommentCountChange?: (count: number) => void;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [page, setPage] = useState(0);

  const { data, refetch } = useSuspenseQuery<CommentResponse>({
    queryKey: ["comments", postId, page],
    queryFn: () => fetchComment({ postId, page }),
  });

  const comments = data?.content ?? [];

  return (
    <section className="flex flex-col gap-2">
      <CommentList comments={comments} refresh={refetch} />
      <ClientSidePagination
        currentPage={page}
        totalPage={data?.totalPages ?? 1}
        onChangePage={setPage}
      />
      <CommentInput postId={postId} onSuccess={refetch} />
    </section>
  );
};

export default CommentSection;
