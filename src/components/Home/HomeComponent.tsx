import React from "react";
import HomeSectionCard from "./HomeSectionCard";
import { CommonPostItem } from "@/types/post";
import BannerSlider from "./BannerSlider";
import PopularPostList from './PopularPostList';

interface HomeComponentProps {
  posts: {
    together: CommonPostItem[];
    dailyLife: CommonPostItem[];
    randomBuy: CommonPostItem[];
  };
}

const HomeComponent = ({ posts }: HomeComponentProps) => {
  return (
    <div className="min-h-full flex pt-20 items-start justify-center px-4">
      <div className="flex flex-col w-full max-w-5xl gap-10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3 rounded-2xl">
            <BannerSlider />
          </div>
          <div className="hidden md:block md:w-1/3">
            <PopularPostList />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 sm:gap-y-12 w-full max-w-5xl px-4">
          <HomeSectionCard category="TOGETHER" items={posts.together} />
          <HomeSectionCard category="DAILY_LIFE" items={posts.dailyLife} />
          <HomeSectionCard
            category="RANDOM_BUY"
            items={posts.randomBuy}
            className="sm:col-span-2"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
