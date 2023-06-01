export type TokenInfo = {
  token: string;
  expiresIn: number;
  expiresAt: number;
  tokenType: string;
  refreshToken?: string;
};
