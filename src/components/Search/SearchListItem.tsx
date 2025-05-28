import { CommonPostDetailItem } from "@/types/post";
import {
  getMainCategoryLabel,
  getSubCategoryLabel,
  isMainCategory,
  isSubCategoryValue,
} from "@/utils/category";
import { getFormattedTimeAgo } from "@/utils/date";
import { getImageUrl } from "@/utils/image";
import { ChevronRight, HeartIcon, MessageCircle } from "lucide-react";
import Image from "next/image";

interface PostListCardProps {
  post: CommonPostDetailItem;
}

const SearchListItem = ({ post }: PostListCardProps) => {
  return (
    <div className="flex flex-col pt-3">
      <div className="flex items-center text-sm text-gray600">
        {isMainCategory(post.category) && getMainCategoryLabel(post.category)}
        {isSubCategoryValue(post.tag) && (
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4" />
            {getSubCategoryLabel(post.tag)}
          </div>
        )}
      </div>

      <div className="flex justify-between w-full pt-0.5 pb-2 gap-2 border-b">
        <div className="flex flex-col justify-between gap-1.5 flex-1">
          <h3 className="font-semibold">{post.title}</h3>
          <p className="text-sm text-gray600 line-clamp-2">
            {post.contentPreview}
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
          <div>
            <Image
              src={getImageUrl(post.thumbnailImage)}
              alt={post.title}
              width={300}
              height={200}
              className="w-full h-[100px] rounded-lg object-cover aspect-square"
              placeholder="blur"
              blurDataURL="/icons/placeholderImage.svg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchListItem;
