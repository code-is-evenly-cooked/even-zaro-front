import type { MainCategory, SubCategoryValue } from "@/types/category";

export interface PostDraft {
  title: string;
  mainCategory: MainCategory | null;
  subCategory: SubCategoryValue | null;
  content: string;
}
