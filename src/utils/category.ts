import { CATEGORY_MAP } from "@/constants/category";
import { MainCategory, SubCategoryValue } from "@/types/category";

// 메인 카테고리 → 한글 라벨
export const getMainCategoryLabel = (key: MainCategory): string => {
  const category = CATEGORY_MAP[key as keyof typeof CATEGORY_MAP];
  return category.label;
};

// 서브 카테고리 → 한글 라벨
export const getSubCategoryLabel = (
  tag: SubCategoryValue,
): string | undefined => {
  for (const category of Object.values(CATEGORY_MAP)) {
    const found = category.options.find((option) => option.tag === tag);
    if (found) return found.label;
  }
  return undefined;
};

// 서브 카테고리 → 이모지
export const getSubCategoryEmoji = (
  tag: SubCategoryValue,
): string | undefined => {
  for (const category of Object.values(CATEGORY_MAP)) {
    const found = category.options.find((option) => option.tag === tag);
    if (found) return found.emoji;
  }
  return undefined;
};

// 서브 카테고리 라벨 → 키(tag)
export const getSubCategoryTagFromLabel = (
  label: string,
): SubCategoryValue | undefined => {
  for (const category of Object.values(CATEGORY_MAP)) {
    const found = category.options.find((option) => option.label === label);
    if (found) return found.tag;
  }
  return undefined;
};
