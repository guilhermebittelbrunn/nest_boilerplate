import { ITokenPayload, ITokenResponse } from '@/shared/types/user';

export interface IGenerateTokenPayload extends Pick<ITokenPayload, 'email' | 'type'> {
  id: string;
}

export interface IJwtService {
  generateTokens(payload: IGenerateTokenPayload): Promise<ITokenResponse>;
}

export const IJwtServiceSymbol = Symbol('IJwtService');
