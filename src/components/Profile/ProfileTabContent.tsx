import { ProfileTabType } from "@/types/profile";
import FavoriteGroupList from "@/components/Favorite/FavoriteGroupList";

interface Props {
  activeTab: ProfileTabType;
}

export default function ProfileTabContent({ activeTab }: Props) {
  switch (activeTab) {
    case "posts":
      return <div>내가 쓴 글 리스트</div>;
    case "comments":
      return <div>내 댓글 리스트</div>;
    case "likes":
      return <div>좋아요 리스트</div>;
    case "favorites":
      return (
        <div>
          <FavoriteGroupList />
        </div>
      );
    default:
      return null;
  }
}
