import { ProfileTabType } from "@/types/profile";
import BookmarkGroupList from "./BookmarkGroupList"

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
    case "bookmarks":
      return (
        <div>
          <BookmarkGroupList />
        </div>
      );
    default:
      return null;
  }
}
