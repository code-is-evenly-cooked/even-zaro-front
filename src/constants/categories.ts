export const CATEGORY_MAP = {
  자취일상: [
    { emoji: "🍯", label: "자취 꿀팁", tag: "tip" },
    { emoji: "🙋🏻", label: "질문있어요", tag: "question" },
  ],
  "같이 쓰자": [
    { emoji: "🛍️", label: "같이 사기", tag: "group-buy" },
    { emoji: "👐", label: "나눔해요", tag: "sharing" },
    { emoji: "🤝", label: "물물교환", tag: "exchange" },
  ],
  "아무거나 샀어요": [
    { emoji: "🤩", label: "소중한 꿀템", tag: "treasure" },
    { emoji: "😭", label: "후회막심", tag: "regret" },
  ],
} as const;

export const MAIN_CATEGORIES = Object.keys(
  CATEGORY_MAP,
) as (keyof typeof CATEGORY_MAP)[];
export type MainCategory = keyof typeof CATEGORY_MAP;
export type SubCategoryOption = (typeof CATEGORY_MAP)[MainCategory][number];
export type SubCategoryValue = SubCategoryOption["tag"];
