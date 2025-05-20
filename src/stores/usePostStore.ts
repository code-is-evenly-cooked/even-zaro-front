import { create } from "zustand";
import { MainCategory, SubCategoryValue } from "@/constants/category";

type PostState = {
  title: string;
  content: string;
  mainCategory: MainCategory | null;
  subCategory: SubCategoryValue | null;
  imageUrlList: string[];
  thumbnailUrl: string | null;

  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setMainCategory: (category: MainCategory | null) => void;
  setSubCategory: (tag: SubCategoryValue | null) => void;
  setImageUrlList: (list: string[]) => void;
  setThumbnailUrl: (url: string | null) => void;
  resetPost: () => void;
};

export const usePostStore = create<PostState>((set) => ({
  title: "",
  content: "",
  mainCategory: null,
  subCategory: null,
  imageUrlList: [],
  thumbnailUrl: null,

  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setMainCategory: (mainCategory) => set({ mainCategory }),
  setSubCategory: (subCategory) => set({ subCategory }),
  setImageUrlList: (list) => set({ imageUrlList: list }),
  setThumbnailUrl: (url) => set({ thumbnailUrl: url }),

  resetPost: () =>
    set({
      title: "",
      content: "",
      mainCategory: null,
      subCategory: null,
      imageUrlList: [],
      thumbnailUrl: null,
    }),
}));
