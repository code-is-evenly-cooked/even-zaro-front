import React from "react";
import HomeSectionCard, { ListItem } from "./HomeSectionCard";
import { SectionType } from "./SectionType";

const HomeComponent = () => {
  // TODO: 지우기
  const dummyItems: ListItem[] = [
    { title: "이사비 절약 공동구매 모집 중", timeAgo: "1시간 전" },
    { title: "화장지 나눠써요 🙌", timeAgo: "2시간 전" },
    { title: "택배 수령 부탁해요", timeAgo: "3시간 전" },
    { title: "주방 세제 나눔합니다", timeAgo: "5시간 전" },
    { title: "쓰레기봉투 공동 구매자 구해요", timeAgo: "6시간 전" },
  ];

  // TODO: 배경색 빼기
  return (
    <div className="min-h-full flex pt-20 items-start justify-center bg-red-50 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 sm:gap-y-12 w-full max-w-4xl px-4">
        <HomeSectionCard type={SectionType.TOGETHER} items={dummyItems} />
        <HomeSectionCard type={SectionType.DAILY_LIFE} items={dummyItems} />

        <div className="col-span-1 sm:col-span-2 bg-white shadow rounded-xl p-4 text-center">
          아무거나샀어요
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
