export const CATEGORY_MAP = {
  TOGETHER: {
    label: "같이쓰기",
    options: [
      { emoji: "🛍️", label: "같이 사기", tag: "GROUP_BUY" },
      { emoji: "👐", label: "나눔해요", tag: "SHARING" },
      { emoji: "🤝", label: "물물교환", tag: "EXCHANGE" },
    ],
  },
  DAILY_LIFE: {
    label: "자취일상",
    options: [
      { emoji: "🍯", label: "자취 꿀팁", tag: "TIPS" },
      { emoji: "🙋🏻", label: "질문있어요", tag: "QUESTIONS" },
    ],
  },
  RANDOM_BUY: {
    label: "아무거나샀어요",
    options: [
      { emoji: "🤩", label: "소중한 꿀템", tag: "TREASURE" },
      { emoji: "😭", label: "후회막심", tag: "REGRET" },
    ],
  },
} as const;

export const MAIN_CATEGORIES = Object.keys(
  CATEGORY_MAP,
) as (keyof typeof CATEGORY_MAP)[];
