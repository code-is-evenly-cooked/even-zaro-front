import { create } from "zustand";

type PostState = {
    title: string;
    content: string;
    category: string | null;
    imageUrlList: string[];
    thumbnailUrl: string | null;
  
    setTitle: (title: string) => void;
    setContent: (content: string) => void;
    setCategory: (category: string) => void;
    setImageUrlList: (list: string[]) => void;
    setThumbnailUrl: (url: string | null) => void;
    resetPost: () => void;
  };

  export const usePostStore = create<PostState>((set) => ({
    title: "",
    content: "",
    category: null,
    imageUrlList: [],
    thumbnailUrl: null,
  
    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    setCategory: (category) => set({ category }),
    setImageUrlList: (list) => set({ imageUrlList: list }),
    setThumbnailUrl: (url) => set({ thumbnailUrl: url }),
  
    resetPost: () =>
      set({
        title: "",
        content: "",
        category: null,
        imageUrlList: [],
        thumbnailUrl: null,
      }),
  }));