import { ITokens } from '../services/types/data';

export const setTokens = (tokens: ITokens) => {
  const accessToken = tokens.accessToken.split('Bearer ')[1];
  const refreshToken = tokens.refreshToken;

  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}
