import { MessageCircle, Heart } from "lucide-react";

interface PostFooterProps {
  likeCount: number;
  commentCount: number;
}

export default function PostFooter({ likeCount, commentCount }: PostFooterProps) {
  return (
    <div className="flex items-center gap-6 mt-8 text-gray-600">
      <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition-colors">
        <Heart size={20} />
        <span>{likeCount}</span>
      </div>
      <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition-colors">
        <MessageCircle size={20} />
        <span>{commentCount}</span>
      </div>
    </div>
  );
}
