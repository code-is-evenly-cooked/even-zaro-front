import React from "react";
import HomeSectionCard from "./HomeSectionCard";
import { SectionType } from "./SectionType";
import { CommonPostItem, ImagePostItem } from "@/types/post";

const HomeComponent = () => {
  // TODO: 지우기
  const dummyItems: CommonPostItem[] = [
    {
      postId: 1,
      title: "이사비 절약 공동구매 모집 중입니다 함께하실분",
      createAt: "1시간 전",
    },
    { postId: 2, title: "화장지 나눠써요 🙌", createAt: "2시간 전" },
    { postId: 3, title: "택배 수령 부탁해요", createAt: "3시간 전" },
    { postId: 4, title: "주방 세제 나눔합니다", createAt: "5시간 전" },
    { postId: 5, title: "쓰레기봉투 공동 구매자 구해요", createAt: "6시간 전" },
  ];

  const imageDummyItems: ImagePostItem[] = [
    {
      postId: 1,
      title: "이사비 절약 공동구매 모집 중",
      content: "이사비 절약 공동구매 모집 중인데 함께하실 분",
      thumbnailUrl:
        "http://k.kakaocdn.net/dn/dPnHPP/btsKoj9P3g3/xRGh0kiZNlqmQ9eCEAnyfk/img_640x640.jpg",
      likeCount: 1,
      commentCount: 1,
      writerProfileImage:
        "http://k.kakaocdn.net/dn/dPnHPP/btsKoj9P3g3/xRGh0kiZNlqmQ9eCEAnyfk/img_640x640.jpg",
      writerNickname: "테스터 1",
      createAt: "1시간 전",
    },
    {
      postId: 2,
      title: "화장지 나눠써요 🙌",
      content: "화장지 나눠 살 사람 모집 중 컴온컴온",
      thumbnailUrl:
        "http://k.kakaocdn.net/dn/dPnHPP/btsKoj9P3g3/xRGh0kiZNlqmQ9eCEAnyfk/img_640x640.jpg",
      likeCount: 1,
      commentCount: 1,
      writerProfileImage:
        "http://k.kakaocdn.net/dn/dPnHPP/btsKoj9P3g3/xRGh0kiZNlqmQ9eCEAnyfk/img_640x640.jpg",
      writerNickname: "테스터 1",
      createAt: "1시간 전",
    },
    {
      postId: 3,
      title: "택배 수령 부탁해요",
      content: "GS25에서 제 택배 수령해달라고 하면 좀 염치없나요",
      thumbnailUrl:
        "http://k.kakaocdn.net/dn/dPnHPP/btsKoj9P3g3/xRGh0kiZNlqmQ9eCEAnyfk/img_640x640.jpg",
      likeCount: 1,
      commentCount: 1,
      writerProfileImage:
        "http://k.kakaocdn.net/dn/dPnHPP/btsKoj9P3g3/xRGh0kiZNlqmQ9eCEAnyfk/img_640x640.jpg",
      writerNickname: "테스터 1",
      createAt: "1시간 전",
    },
    {
      postId: 4,
      title: "주방 세제 나눔합니다",
      content: "프로쉬 실수로 너무 많이 사버림",
      thumbnailUrl:
        "http://k.kakaocdn.net/dn/dPnHPP/btsKoj9P3g3/xRGh0kiZNlqmQ9eCEAnyfk/img_640x640.jpg",
      likeCount: 100,
      commentCount: 3,
      writerProfileImage:
        "http://k.kakaocdn.net/dn/dPnHPP/btsKoj9P3g3/xRGh0kiZNlqmQ9eCEAnyfk/img_640x640.jpg",
      writerNickname: "테스터 1",
      createAt: "1시간 전",
    },
  ];

  // TODO: 배경색 빼기
  return (
    <div className="min-h-full flex pt-20 items-start justify-center px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 sm:gap-y-12 w-full max-w-3xl px-4">
        <HomeSectionCard type={SectionType.TOGETHER} items={dummyItems} />
        <HomeSectionCard type={SectionType.DAILY_LIFE} items={dummyItems} />
        <HomeSectionCard
          type={SectionType.RANDOM_BUY}
          items={imageDummyItems}
          className="sm:col-span-2"
        />
      </div>
    </div>
  );
};

export default HomeComponent;
