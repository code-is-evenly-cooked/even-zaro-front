import { FollowUser } from "@/lib/api/follow";
import { getProfileImageUrl } from "@/utils/image";
import Image from "next/image";

const UserFollowItem = ({ item }: { item: FollowUser }) => {
  return (
    <li className="flex items-center gap-2">
      <Image
        src={getProfileImageUrl(item.profileImage)}
        alt={item.userName}
        width={32}
        height={32}
        className="w-8 h-8 rounded-full"
      />
      <span>{item.userName}</span>
    </li>
  );
};

export default UserFollowItem;
