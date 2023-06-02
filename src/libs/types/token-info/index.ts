export type TokenInfo = {
  access_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
  refresh_token?: string;
};
