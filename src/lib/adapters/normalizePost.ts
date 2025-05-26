import { ImagePostItem, PostDetailItem } from "@/types/post";

export const convertDetailToImagePostItem = (
  detail: PostDetailItem,
): ImagePostItem => {
  return {
    postId: detail.postId,
    title: detail.title,
    content: detail.content,
    thumbnailImage: detail.thumbnailImage ?? "",
    likeCount: detail.likeCount,
    commentCount: detail.commentCount,
    writerProfileImage: detail.user.profileImage,
    writerNickname: detail.user.nickname,
    createAt: detail.createdAt,
  };
};
