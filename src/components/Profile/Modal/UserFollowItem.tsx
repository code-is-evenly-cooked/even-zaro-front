import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { followUser, FollowUser, unfollowUser } from "@/lib/api/follow";
import { getErrorMessage } from "@/lib/error/getErrorMessage";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { useAuthStore } from "@/stores/useAuthStore";
import { getProfileImageUrl } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const UserFollowItem = ({ item }: { item: FollowUser }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(item.following);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();

  const { showToastMessage } = useToastMessageContext();

  const handleToggleFollow = async () => {
    const previousState = isFollowing;
    setIsFollowing(!previousState);
    console.log(previousState);
    try {
      setIsLoading(true);
      if (previousState) {
        await unfollowUser(item.userId);
      } else {
        await followUser(item.userId);
      }
    } catch (error) {
      showToastMessage({ type: "error", message: getErrorMessage(error) });
      setIsFollowing(previousState);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li className="flex items-center justify-between gap-4">
      <Link
        className="flex items-center gap-2 min-w-0"
        href={`/profile/${item.userId}`}
      >
        <Image
          src={getProfileImageUrl(item.profileImage)}
          alt={item.userName}
          width={32}
          height={32}
          className="w-8 h-8 rounded-full aspect-square object-cover"
        />
        <span className="whitespace-nowrap text-ellipsis overflow-hidden">
          {item.userName}
        </span>
      </Link>
      {user?.userId !== item.userId && (
        <button
          onClick={handleToggleFollow}
          disabled={isLoading}
          className={`flex items-center justify-center text-sm px-4 py-1.5 rounded-md transition-all duration-300 shrink-0 font-semibold ${
            isFollowing
              ? "bg-gray200 text-gray900 hover:bg-opacity-70"
              : "bg-violet300 text-gray900 hover:bg-opacity-70"
          }`}
        >
          {isLoading ? <LoadingSpinner /> : isFollowing ? "팔로잉" : "팔로우"}
        </button>
      )}
    </li>
  );
};

export default UserFollowItem;
