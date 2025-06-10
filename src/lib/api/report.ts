import { client } from "../fetch/client";

interface ReportParams {
  id: string;
  reasonType: string;
  reasonText: string;
}

export const reportComment = async ({
  id,
  reasonType,
  reasonText,
}: ReportParams): Promise<void> => {
  return await client<void>(`/comments/${id}/report`, {
    method: "POST",
    needAuth: true,
    body: JSON.stringify({ reasonType, reasonText }),
  });
};
