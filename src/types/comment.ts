
export interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

export interface CommentSectionProps {
  workspaceId: string;
  initialComments?: Comment[];
}