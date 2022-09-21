import { User } from './User';
export interface ApiResponse {
  ok: boolean;
  error?: string;
  message?: string;
  user?: User;
}

export interface TokenResponse extends ApiResponse {
  token: string;
}
