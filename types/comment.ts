export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CreateCommentPayload {
  name: string;
  email: string;
  body: string;
  postId?: number;
}