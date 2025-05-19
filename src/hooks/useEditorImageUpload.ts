import { useEffect, MutableRefObject } from "react";
import { Editor } from "@toast-ui/react-editor";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
          const res = await fetch(
            `${API_BASE_URL}/api/presigned-url?type=${type}&ext=${ext}`,
            { method: "GET" },
          );

          if (!res.ok) throw new Error("프리사인드 URL 요청 실패");

          const json = await res.json();
          const { url, key } = json.data;

          // S3에 이미지 PUT 업로드
          await fetch(url, {
            method: "PUT",
            body: blob,
            headers: {
              "Content-Type": blob.type,
            },
          });

          // S3 public 이미지 URL을 editor에 삽입
          const imageUrl = `https://d1eni2d3ighqku.cloudfront.net/${key}`;
          callback(imageUrl, "이미지");
        } catch (err) {
          console.error("이미지 업로드 오류", err);
          alert("이미지 업로드 중 문제가 발생했습니다.");
        }
      },
    );
  }, [editorRef]);
}
