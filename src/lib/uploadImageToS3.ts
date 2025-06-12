import { client } from "@/lib/fetch/client";

/**
 * S3에 이미지 업로드 후 key 반환
 * @param file 업로드할 이미지 파일
 * @param type "profile" 또는 "post"
 * @param userId 프로필 업로드 시 사용자 ID 필수
 */
export const uploadImageToS3 = async (
  file: File,
  type: "profile" | "post",
  userId?: number,
): Promise<string> => {
  const ext = file.type.split("/")[1];

  const query = new URLSearchParams({ type, ext });
  if (type === "profile") {
    if (!userId) throw new Error("userId는 profile 업로드 시 필수입니다.");
    query.append("userId", String(userId));
  }

  const { url, key } = await client<{ url: string; key: string }>(
    `/presigned-url?${query.toString()}`,
    {
      method: "GET",
      needAuth: true,
    },
  );

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!res.ok) throw new Error("S3 업로드 실패");

  return key;
};
