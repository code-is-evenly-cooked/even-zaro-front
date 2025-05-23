import { CATEGORY_MAP } from "@/constants/category";
import { MainCategory, SubCategoryValue } from "@/types/category";

// 메인 카테고리 → 한글 라벨
export const getMainCategoryLabel = (key: MainCategory): string => {
  const category = CATEGORY_MAP[key];
  return category?.label ?? "알 수 없음";
};

// 메인 카테고리 → 제목(title)
export const getMainCategoryTitle = (key: MainCategory): string => {
  const category = CATEGORY_MAP[key];
  return category?.title ?? "알 수 없음";
};

// 서브 카테고리 → 한글 라벨
export const getSubCategoryLabel = (tag: SubCategoryValue): string => {
  for (const category of Object.values(CATEGORY_MAP)) {
    const found = category.options.find((option) => option.tag === tag);
    if (found) return found.label;
  }
  return "알 수 없음";
};

// 서브 카테고리 → 이모지
export const getSubCategoryEmoji = (tag: SubCategoryValue): string => {
  for (const category of Object.values(CATEGORY_MAP)) {
    const found = category.options.find((option) => option.tag === tag);
    if (found) return found.emoji;
  }
  return "❓";
};

// 서브 카테고리 라벨 → 키(tag)
export const getSubCategoryTagFromLabel = (label: string): SubCategoryValue => {
  for (const category of Object.values(CATEGORY_MAP)) {
    const found = category.options.find((option) => option.label === label);
    if (found) return found.tag;
  }
  return "UNKNOWN_TAG" as SubCategoryValue;
};
