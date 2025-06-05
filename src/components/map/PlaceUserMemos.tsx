import React from "react";
import { PlaceDetailResponse } from "@/types/map";
import PlaceUserMemosHeader from "@/components/map/PlaceUserMemosHeader";
import { BookmarkInfo } from "@/components/map/BookmarkInfo";
import { UserMemoCards } from "@/components/map/UserMemoCards";

interface PlaceUserMemosProps {
  placeDetail: PlaceDetailResponse;
  backPage: () => void;
}

export default function PlaceUserMemos({
  placeDetail,
  backPage,
}: PlaceUserMemosProps) {
  return (
    <div className="flex flex-col absolute -bottom-4 left-4 z-10 w-96 h-96 bg-white rounded-t-2xl shadow-lg overflow-hidden">
      {/* 헤더 */}
      <PlaceUserMemosHeader placeDetail={placeDetail} backPage={backPage} />
      {/* 즐겨찾기 정보 */}
      <BookmarkInfo placeDetail={placeDetail} />
      {/* 유저 메모 리스트 */}
      <UserMemoCards placeDetail={placeDetail} />
    </div>
  );
}
