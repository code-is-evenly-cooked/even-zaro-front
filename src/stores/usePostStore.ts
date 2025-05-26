import { MainCategory, SubCategoryValue } from "@/types/category";
import { create } from "zustand";

type PostState = {
  title: string;
  content: string;
  mainCategory: MainCategory | null;
  subCategory: SubCategoryValue | null;
  imageList: string[];
  thumbnailImage: string | null;

  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setMainCategory: (category: MainCategory | null) => void;
  setSubCategory: (tag: SubCategoryValue | null) => void;
  setImageList: (list: string[]) => void;
  setThumbnailImage: (url: string | null) => void;
  resetPost: () => void;
};

export const usePostStore = create<PostState>((set) => ({
  title: "",
  content: "",
  mainCategory: null,
  subCategory: null,
  imageList: [],
  thumbnailImage: null,

  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setMainCategory: (mainCategory) => set({ mainCategory }),
  setSubCategory: (subCategory) => set({ subCategory }),
  setImageList: (list) => set({ imageList: list }),
  setThumbnailImage: (url) => set({ thumbnailImage: url }),

  resetPost: () =>
    set({
      title: "",
      content: "",
      mainCategory: null,
      subCategory: null,
      imageList: [],
      thumbnailImage: null,
    }),
}));
