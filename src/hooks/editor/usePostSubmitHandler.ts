import { useRouter } from "next/navigation";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { createPost } from "@/lib/api/post.client";
import { extractImageKeys, extractThumbnailKey } from "@/utils/editorImage";
import { usePostStore } from "@/stores/usePostStore";
import { MainCategory } from "@/types/category";

export function usePostSubmitHandler() {
  const router = useRouter();
  const { showToastMessage } = useToastMessageContext();
  const {
    title,
    content,
    mainCategory,
    subCategory,
    setImageList,
    setThumbnailImage,
    resetPost,
  } = usePostStore();

  const handleSubmit = async () => {
    try {
      if (!title || !content) {
        showToastMessage({
          message: "제목, 내용을 입력해주세요.",
          type: "error",
        });
        return;
      }

      if (!mainCategory || !subCategory) {
        showToastMessage({
          message: "카테고리와 태그를 선택해주세요.",
          type: "error",
        });
        return;
      }

      const imageUrls = extractImageKeys(content);
      const thumbnail = extractThumbnailKey(content);

      setImageList(imageUrls);
      setThumbnailImage(thumbnail);

      const { category, postId } = await createPost({
        title,
        content,
        category: mainCategory as MainCategory,
        tag: subCategory,
        postImageList: imageUrls,
        thumbnailImage: thumbnail,
      });

      showToastMessage({
        message: "게시글 작성이 완료되었습니다!",
        type: "success",
      });
      resetPost();
      router.replace(`/board/${category}/${postId}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다";

      showToastMessage({
        message: errorMessage,
        type: "error",
      });
    }
  };

  return { handleSubmit };
}
