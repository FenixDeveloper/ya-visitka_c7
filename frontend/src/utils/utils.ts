import { useEffect, useRef } from 'react';
import { ITokens } from '../services/types/data';

export const getListYears = (startYear: number) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  startYear = Number(startYear) || 1980;
  while ( startYear <= currentYear ) {
    years.push(startYear++);
  }
  return years;
}

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

export function usePrevious<Type>(value: Type): Type | undefined {
  const ref = useRef<Type | undefined>();
  useEffect(() => {
    ref.current = value;
  },[value]);
  return ref.current;
}
