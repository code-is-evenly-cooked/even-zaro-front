export interface PostDraft {
  title: string;
  content: string;
}

export interface CreatePostPayload {
  title: string;
  content: string;
  category: string;
  tag?: string;
  postImageList?: string[];
  thumbnailImage?: string | null;
}

export interface CreatePostResponse {
  category: string;
  postId: number;
}
