import { useSearchParams, useRouter } from "next/navigation";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { createPost, updatePost } from "@/lib/api/post.client";
import { extractImageKeys, extractThumbnailKey } from "@/utils/editorImage";
import { usePostStore } from "@/stores/usePostStore";
import { MainCategory } from "@/types/category";

export function usePostSubmitHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const postId = searchParams.get("postId");
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

      if (postId) {
        // 수정 모드
        await updatePost(Number(postId), {
          title,
          content,
          tag: subCategory,
          postImageList: imageUrls ?? [],
          thumbnailImage: thumbnail ?? null,
        });

        showToastMessage({
          message: "게시글 수정이 완료되었습니다!",
          type: "success",
        });

        resetPost();
        router.replace(`/board/${mainCategory}/${postId}`);
      } else {
        // 작성 모드
        const { category, postId: newPostId } = await createPost({
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
        router.replace(`/board/${category}/${newPostId}`);
      }
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
