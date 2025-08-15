import { UserTypeEnum } from './user';

export const JWT_DEFAULT_STRATEGY = 'jwt';

export const JWT_REFRESH_STRATEGY = 'jwt-refresh';

export interface ITokenPayload {
  sub: string;
  email: string;
  type: UserTypeEnum;
  iat: number;
  exp: number;
}

export interface ITokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
}
