export interface CommentResponse {
  content: CommentItem[];
  totalPages: number;
  number: number;
}

export interface CommentItem {
  id: number;
  content: string;
  nickname: string;
  profileImage: string | null;
  liveAloneDate: string | null;
  createdAt: string;
  updatedAt: string;
  isEdited: boolean;
  isMine: boolean;
  mentionedUser: string | null;
}
