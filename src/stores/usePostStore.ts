import { MainCategory, SubCategoryValue } from "@/types/category";
import { create } from "zustand";

type PostState = {
  title: string;
  content: string;
  mainCategory: MainCategory | null;
  subCategory: SubCategoryValue | null;
  imageUrlList: string[];
  thumbnailImage: string | null;

  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setMainCategory: (category: MainCategory | null) => void;
  setSubCategory: (tag: SubCategoryValue | null) => void;
  setImageUrlList: (list: string[]) => void;
  setThumbnailImage: (url: string | null) => void;
  resetPost: () => void;
};

export const usePostStore = create<PostState>((set) => ({
  title: "",
  content: "",
  mainCategory: null,
  subCategory: null,
  imageUrlList: [],
  thumbnailImage: null,

  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setMainCategory: (mainCategory) => set({ mainCategory }),
  setSubCategory: (subCategory) => set({ subCategory }),
  setImageUrlList: (list) => set({ imageUrlList: list }),
  setThumbnailImage: (url) => set({ thumbnailImage: url }),

  resetPost: () =>
    set({
      title: "",
      content: "",
      mainCategory: null,
      subCategory: null,
      imageUrlList: [],
      thumbnailImage: null,
    }),
}));
