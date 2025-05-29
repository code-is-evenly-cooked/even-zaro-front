import IconButton from "@/components/common/Button/IconButton";
import { CommentItem } from "@/types/comment";
import { getProfileImageUrl } from "@/utils/image";
import { MoreVerticalIcon } from "lucide-react";
import Image from "next/image";

interface CommentItemProps {
  item: CommentItem;
}

const CommentListItem = ({ item }: CommentItemProps) => {
  return (
    <div className="flex flex-col gap-2 py-3 border-b">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={getProfileImageUrl(item.profileImage)}
            alt={item.nickname}
            width={32}
            height={32}
            className="w-7 h-7 rounded-full"
          />
          <p className="text-md text-gray900">{item.nickname}</p>
          {/* TODO: livealonedate */}
        </div>
        <IconButton icon={<MoreVerticalIcon />} label={"메뉴"} isTransparent />
      </div>
      <p className="text-md text-gray900 px-2">{item.content}</p>
    </div>
  );
};

export default CommentListItem;
