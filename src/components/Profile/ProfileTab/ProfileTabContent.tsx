import { ProfileTabType } from "@/types/profile";
import FavoriteGroupList from "@/components/Favorite/FavoriteGroupList";
import ProfilePostList from "../ProfilePostList";

interface Props {
  activeTab: ProfileTabType;
}

export default function ProfileTabContent({ activeTab }: Props) {
  const isPostRelatedTab = ["posts", "comments", "likes"].includes(activeTab);

  if (isPostRelatedTab) {
    return (
      <div className="mt-4">
        <ProfilePostList
          type={activeTab as Exclude<ProfileTabType, "favorites">}
        />
      </div>
    );
  }

  if (activeTab === "favorites") {
    return (
      <div className="mt-4">
        <FavoriteGroupList />
      </div>
    );
  }

  return null;
}
