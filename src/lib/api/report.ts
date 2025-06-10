import { client } from "../fetch/client";

interface ReportCommentParams {
  commentId: string;
  reasonType: string;
  reasonText: string;
}
export const reportComment = async ({
  commentId,
  reasonType,
  reasonText,
}: ReportCommentParams): Promise<void> => {
  return await client<void>(`/comments/${commentId}/report`, {
    method: "POST",
    needAuth: true,
    body: JSON.stringify({ reasonType, reasonText }),
  });
};
