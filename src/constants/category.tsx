import {
  TipIcon,
  TogetherIcon,
  ShoppingBagIcon,
} from "@/components/common/Icons";

export const CATEGORY_MAP = {
  TOGETHER: {
    title: "같이 쓰자",
    label: "같이쓰기",
    icon: <TogetherIcon />,
    route: "/together",
    options: [
      { emoji: "🛍️", label: "같이 사기", tag: "GROUP_BUY" },
      { emoji: "👐", label: "나눔해요", tag: "SHARING" },
      { emoji: "🤝", label: "물물교환", tag: "EXCHANGE" },
    ],
  },
  DAILY_LIFE: {
    title: "자취 일상",
    label: "자취일상",
    icon: <TipIcon />,
    route: "/daily-life",
    options: [
      { emoji: "🍯", label: "자취 꿀팁", tag: "TIPS" },
      { emoji: "🙋🏻", label: "질문있어요", tag: "QUESTIONS" },
    ],
  },
  RANDOM_BUY: {
    title: "텅장 일기",
    label: "텅장 일기",
    icon: <ShoppingBagIcon />,
    route: "/random-buy",
    options: [
      { emoji: "🤩", label: "소중한 꿀템", tag: "TREASURE" },
      { emoji: "😭", label: "후회막심", tag: "REGRET" },
    ],
  },
} as const;
