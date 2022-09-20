export interface ApiResponse {
  ok: boolean;
  error?: string;
  message?: string;
}

export interface TokenResponse extends ApiResponse {
  token: string;
}
