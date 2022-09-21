import { User } from './User';

export interface Post {
  createdAt?: Date;
  message: string;
  img?: string[];
  coords?: string;
  user?: User;
}

export interface PostsPaginatedResponse {
  ok: boolean;
  error?: string;
  page?: number;
  posts?: Post[];
}
