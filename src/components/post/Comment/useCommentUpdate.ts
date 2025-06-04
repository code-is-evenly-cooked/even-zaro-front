import { editComment } from "@/lib/api/comment";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { CommentItem } from "@/types/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateCommentParams {
  id: number;
  content: string;
  mentionedNickname: string;
}

const useCommentUpdate = () => {
  const queryClient = useQueryClient();
  const { showToastMessage } = useToastMessageContext();

  return useMutation({
    mutationFn: ({ id, content, mentionedNickname }: UpdateCommentParams) =>
      editComment({ commentId: id, content, mentionedNickname }),

    // optimistic update
    onMutate: async ({ id, content, mentionedNickname }) => {
      await queryClient.cancelQueries({ queryKey: ["comments"] });

      const prevComments = queryClient.getQueryData<CommentItem[]>([
        "comments",
      ]);

      if (prevComments) {
        queryClient.setQueryData<CommentItem[]>(["comments"], (old) =>
          old?.map((comment) =>
            comment.id === id
              ? { ...comment, content, mentionedNickname }
              : comment,
          ),
        );
      }
      return { prevComments };
    },

    // 실패시 롤백
    onError: (err, _vars, context) => {
      if (context?.prevComments) {
        queryClient.setQueryData(["comments"], context.prevComments);
      }

      const message =
        err instanceof Error
          ? err.message
          : "댓글 삭제 중 오류가 발생했습니다.";
      showToastMessage({ type: "error", message: message });
    },
    // 성공 시 서버 상태 동기화
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

export default useCommentUpdate;
