import { ImagePostItem } from "@/types/post";
import { getImageUrl, getProfileImageUrl } from "@/utils/image";
import Image from "next/image";

const PostImageCard = ({
  title,
  content,
  thumbnailImage,
  likeCount,
  commentCount,
  writerProfileImage,
  writerNickname,
}: ImagePostItem) => {
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
      </div>
      {/* 본문 */}
      <div className="pt-2 px-1 flex flex-col gap-2">
        {/* 작성자 */}
        <div className="flex items-center gap-1">
          <Image
            src={getProfileImageUrl(writerProfileImage)}
            alt={writerNickname}
            width={20}
            height={20}
            className="rounded-full object-cover"
          />
          <span className="text-sm text-gray600 whitespace-nowrap">
            {writerNickname}
          </span>
        </div>
        {/* 컨텐츠 */}
        <div className="flex flex-col gap-0">
          <h3 className="text-base font-semibold text-gray900 line-clamp-2">
            {title}
          </h3>
          <h4 className=" text-sm text-gray600 line-clamp-1">{content}</h4>
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
