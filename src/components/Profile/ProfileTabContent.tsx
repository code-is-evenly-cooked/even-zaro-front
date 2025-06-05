import { ProfileTabType } from "@/types/profile";
import BookmarkGroupList from "./BookmarkGroupList";
import React from "react";

interface Props {
  activeTab: ProfileTabType;
}

export default function ProfileTabContent({ activeTab }: Props) {
  let content: React.ReactNode;

  switch (activeTab) {
    case "posts":
      content = <div>내가 쓴 글 리스트</div>;
      break;
    case "comments":
      content = <div>내 댓글 리스트</div>;
      break;
    case "likes":
      content = <div>좋아요 리스트</div>;
      break;
    case "bookmarks":
      content = <BookmarkGroupList />;
      break;
    default:
      content = null;
      break;
  }

  return <div className="mt-4">{content}</div>;
}
