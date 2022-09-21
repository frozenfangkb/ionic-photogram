import { Post } from './Post';
import { User } from './User';
export interface ApiResponse {
  ok: boolean;
  error?: string;
  message?: string;
  user?: User;
  post?: Post;
}

export interface TokenResponse extends ApiResponse {
  token: string;
}
