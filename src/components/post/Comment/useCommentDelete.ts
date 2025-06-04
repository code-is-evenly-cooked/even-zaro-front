import { deleteComment } from "@/lib/api/comment";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { CommentItem } from "@/types/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCommentDelete = () => {
  const queryClient = useQueryClient();
  const { showToastMessage } = useToastMessageContext();

  return useMutation({
    mutationFn: (id: number) => deleteComment(id),

    // optimistic delete
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["comments"] });

      const prevComments = queryClient.getQueryData<CommentItem[]>([
        "comments",
      ]);
      queryClient.setQueryData<CommentItem[]>(["comments"], (old) =>
        old?.filter((comment) => comment.id !== id),
      );
      return { prevComments };
    },

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

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

export default useCommentDelete;
