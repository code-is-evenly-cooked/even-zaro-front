import { editComment } from "@/lib/api/comment";
import { CommentItem } from "@/types/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateCommentParams {
  id: number;
  content: string;
  mentionedNickname: string;
}

const useCommentUpdate = () => {
  const queryClient = useQueryClient();

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
    onError: (_err, _vars, context) => {
      if (context?.prevComments) {
        queryClient.setQueryData(["comments"], context.prevComments);
      }
    },
    // 성공 시 서버 상태 동기화
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
};

export default useCommentUpdate;
