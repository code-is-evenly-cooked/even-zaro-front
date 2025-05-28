import { useEffect, MutableRefObject } from "react";
import { Editor } from "@toast-ui/react-editor";
import { getImageUrl } from "@/utils/image";
import { client } from "@/lib/fetch/client";

export function useEditorImageUpload(
  editorRef: MutableRefObject<Editor | null>,
) {
  // 이미지 업로드 구현 (S3 Presigned URL)
  useEffect(() => {
    const editor = editorRef.current?.getInstance();
    if (!editor) return;

    // 중복 방지
    editor.removeHook("addImageBlobHook");

    editor.addHook(
      "addImageBlobHook",
      async (blob: Blob, callback: (url: string, alt: string) => void) => {
        try {
          const ext = blob.type.split("/")[1]; // "image/png" → "png"
          const type = "post"; // post 또는 profile

          // presigned URL 요청
          const { url, key } = await client<{
            url: string;
            key: string;
          }>(`/presigned-url?type=${type}&ext=${ext}`, {
            method: "GET",
          });

          // S3에 이미지 PUT 업로드
          const uploadRes = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": blob.type,
            },
            body: blob,
          });

          if (!uploadRes.ok) throw new Error("S3 업로드 실패");

          // S3 public 이미지 URL을 editor에 삽입
          const imageUrl = getImageUrl(key);
          callback(imageUrl, "이미지");
        } catch (err) {
          console.error("이미지 업로드 오류", err);
          alert("이미지 업로드 중 문제가 발생했습니다.");
        }
      },
    );
  }, [editorRef]);
}
