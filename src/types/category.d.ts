import { CATEGORY_MAP } from "@/constants/category";

export type MainCategory = keyof typeof CATEGORY_MAP;
export const MAIN_CATEGORIES = Object.keys(CATEGORY_MAP) as MainCategory[];

export type SubCategoryOption =
  (typeof CATEGORY_MAP)[MainCategory]["options"][number];

export type SubCategoryValue = SubCategoryOption["tag"];
