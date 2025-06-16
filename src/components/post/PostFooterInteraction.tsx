"use client";

import { useState } from "react";
import PostFooterWithFloating from "./PostFooterWithFloating";
import CommentSection from "./Comment/CommentSection";

interface PostInteractionProps {
  postId: number;
  authorUserId: number;
  initialLikeCount: number;
  initialCommentCount: number;
}

export default function PostInteraction({
  postId,
  authorUserId,
  initialLikeCount,
  initialCommentCount,
}: PostInteractionProps) {
  const [commentCount, setCommentCount] = useState(initialCommentCount);

  return (
    <>
      <PostFooterWithFloating
        postId={postId}
        likeCount={initialLikeCount}
        commentCount={commentCount}
        authorUserId={authorUserId}
      />
      <CommentSection postId={postId} onCommentCountChange={setCommentCount} />
    </>
  );
}
