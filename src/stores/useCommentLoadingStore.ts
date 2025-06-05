import { create } from "zustand";

interface CommentLoadingState {
  editingId: number | null;
  deletingId: number | null;
  setEditingId: (id: number | null) => void;
  setDeletingId: (id: number | null) => void;
}

export const useCommentLoadingStore = create<CommentLoadingState>((set) => ({
  editingId: null,
  deletingId: null,
  setEditingId: (id: number | null) => set({ editingId: id }),
  setDeletingId: (id: number | null) => set({ deletingId: id }),
}));
