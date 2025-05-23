import { TogetherIcon, TipIcon, ShoppingBagIcon } from "../common/Icons";

export enum SectionType {
  TOGETHER = "together",
  DAILY_LIFE = "dailyLife",
  RANDOM_BUY = "randomBuy",
}

export const SECTION_META: Record<
  SectionType,
  {
    title: string;
    icon: React.ReactNode;
    route: string;
  }
> = {
  [SectionType.TOGETHER]: {
    title: "같이 쓰자",
    icon: <TogetherIcon />,
    route: "/together",
  },
  [SectionType.DAILY_LIFE]: {
    title: "자취 일상",
    icon: <TipIcon />,
    route: "/daily-life",
  },
  [SectionType.RANDOM_BUY]: {
    title: "아무거나 샀어요",
    icon: <ShoppingBagIcon />,
    route: "/random-buy",
  },
};
