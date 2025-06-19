import { CommonPostDetailItem } from "@/types/post";
import { getSubCategoryEmoji, isSubCategoryValue } from "@/utils/category";
import { getFormattedTimeAgo } from "@/utils/date";
import { getImageUrl, removeMarkdownImages } from "@/utils/image";
import { HeartIcon, MessageCircle } from "lucide-react";
import Image from "next/image";

interface PostListCardProps {
  post: CommonPostDetailItem;
}

const PostListCard = ({ post }: PostListCardProps) => {
  return (
    <div className="flex justify-between w-full pt-3 pb-2 gap-2 border-b hover:bg-gray200/40">
      {isSubCategoryValue(post.tag) ? getSubCategoryEmoji(post.tag) : "❓"}
      <div className="flex flex-col justify-between gap-1.5 flex-1">
        <h3 className="font-semibold hover:underline">{post.title}</h3>
        <p className="text-sm text-gray600 line-clamp-2 break-all">
          {removeMarkdownImages(post.content)}
        </p>
        <div className="flex flex-col justify-center pt-1 gap-0.5">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <HeartIcon className="w-4 h-4" />
              {post.likeCount}
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {post.commentCount}
            </div>
          </div>
          <span className="text-xs text-gray-400 font-base">
            {getFormattedTimeAgo(post.createdAt)}
          </span>
        </div>
      </div>
      {post.thumbnailImage && (
        <div className="mt-3 max-w-[120px]">
          <Image
            src={getImageUrl(post.thumbnailImage)}
            alt={post.title}
            width={300}
            height={200}
            className="w-full rounded-lg object-cover aspect-square"
            placeholder="blur"
            blurDataURL="/icons/placeholderImage.svg"
          />
        </div>
      )}
    </div>
  );
};

export default PostListCard;
