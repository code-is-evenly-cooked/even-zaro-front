import { create } from "zustand";

interface CommentReplyState {
  replyTo: string | null;
  setReplyTarget: (nickname: string) => void;
  resetReplyTarget: () => void;
}

export const useCommentReplyStore = create<CommentReplyState>((set) => ({
  replyTo: null,
  setReplyTarget: (nickname: string) => set({ replyTo: nickname }),
  resetReplyTarget: () => set({ replyTo: null }),
}));
