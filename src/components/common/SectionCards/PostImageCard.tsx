import { ImagePostDetailItem } from "@/types/post";
import { getSubCategoryEmoji, getSubCategoryLabel } from "@/utils/category";
import {
  getImageUrl,
  getProfileImageUrl,
  removeMarkdownImages,
} from "@/utils/image";
import Image from "next/image";

const PostImageCard = ({
  title,
  content,
  thumbnailImage,
  likeCount,
  commentCount,
  writerProfileImage,
  writerNickname,
  tag,
}: ImagePostDetailItem) => {
  if (!thumbnailImage) {
    return null;
  }
  return (
    <div>
      <div className="relative w-full aspect-square">
        <Image
          src={getImageUrl(thumbnailImage)}
          alt={title}
          fill
          sizes="100%"
          className="object-cover"
        />
        <div className="bg-gray200/70 px-2 py-0.5 rounded-md absolute top-2 left-2 text-[12px] z-10">
          {getSubCategoryEmoji(tag) + " " + getSubCategoryLabel(tag)}
        </div>
      </div>
      {/* 본문 */}
      <div className="pt-2 px-1 flex flex-col gap-2">
        {/* 작성자 */}
        <div className="flex items-center gap-1">
          <Image
            src={getProfileImageUrl(writerProfileImage)}
            alt={writerNickname ?? "이미지"}
            width={20}
            height={20}
            className="rounded-full object-cover aspect-square"
          />
          <span className="text-sm text-gray600 whitespace-nowrap">
            {writerNickname}
          </span>
        </div>
        {/* 컨텐츠 */}
        <div className="flex flex-col gap-0">
          <h3 className="text-base font-semibold text-gray900 line-clamp-2 hover:underline">
            {title}
          </h3>
          <h4 className=" text-sm text-gray600 line-clamp-1">
            {removeMarkdownImages(content)}
          </h4>
        </div>
        {/* 좋아요, 댓글 */}
        <div className="flex items-center justify-end pt-0.5 pr-1 text-xs font-light gap-2">
          <span>
            좋아요 <span className="font-bold">{likeCount}</span>개
          </span>
          <span>
            댓글 <span className="font-bold">{commentCount}</span>개
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostImageCard;
