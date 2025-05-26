import { PostDetailItem } from "@/types/post";
import { getSubCategoryEmoji, isSubCategoryValue } from "@/utils/category";
import { getFormattedTimeAgo } from "@/utils/date";
import { HeartIcon, MessageCircle } from "lucide-react";
import Image from "next/image";

interface PostListCardProps {
  post: PostDetailItem;
}

const PostListCard = ({ post }: PostListCardProps) => {
  return (
    <div className="flex justify-between w-full py-4 gap-4 border-b">
      {isSubCategoryValue(post.tag) ? getSubCategoryEmoji(post.tag) : "❓"}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-semibold">{post.title}</h3>
        <p className="text-sm text-gray600 line-clamp-2">{post.content}</p>
        <div className="flex items-center justify-between pt-2">
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
          <span className="text-sm text-gray-400 font-base">
            {getFormattedTimeAgo(post.createdAt)}
          </span>
        </div>
      </div>
      {post.thumbnailImage && (
        <div className="mt-3">
          <Image
            src={post.thumbnailImage}
            alt={post.title}
            width={300}
            height={200}
            className="w-full h-[100px] rounded-lg object-cover"
            placeholder="blur"
            blurDataURL="/placeholderImage.svg"
          />
        </div>
      )}
    </div>
  );
};

export default PostListCard;
