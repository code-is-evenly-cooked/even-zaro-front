import BaseButton from "@/components/common/Button/BaseButton";
import { followUser, FollowUser, unfollowUser } from "@/lib/api/follow";
import { getErrorMessage } from "@/lib/error/getErrorMessage";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { getProfileImageUrl } from "@/utils/image";
import Image from "next/image";
import { useState } from "react";

const UserFollowItem = ({ item }: { item: FollowUser }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const { showToastMessage } = useToastMessageContext();

  const handleToggleFollow = async () => {
    const previousState = isFollowing;
    setIsFollowing(!previousState);

    try {
      if (previousState) {
        await unfollowUser(item.userId);
      } else {
        await followUser(item.userId);
      }
    } catch (error) {
      showToastMessage({ type: "error", message: getErrorMessage(error) });
      setIsFollowing(previousState);
    }
  };

  return (
    <li className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Image
          src={getProfileImageUrl(item.profileImage)}
          alt={item.userName}
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <span>{item.userName}</span>
      </div>
      {isFollowing ? (
        <BaseButton
          color="violet800"
          variant="outlined"
          size="md"
          onClick={handleToggleFollow}
        >
          팔로잉
        </BaseButton>
      ) : (
        <BaseButton color="violet800" size="md" onClick={handleToggleFollow}>
          팔로우
        </BaseButton>
      )}
    </li>
  );
};

export default UserFollowItem;
