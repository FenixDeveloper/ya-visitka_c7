import { useEffect, useRef } from 'react';
import { TRedirectURI } from '../services/types/data';

export const getListYears = (startYear: number) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  startYear = Number(startYear) || 1980;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
}

export const setToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}


export function usePrevious<Type>(value: Type): Type | undefined {
  const ref = useRef<Type | undefined>();
  useEffect(() => {
    ref.current = value;
  },[value]);
  return ref.current;
}

export function getCurrentRedirectURI(dataRedirectURI: TRedirectURI): string {
  const location = window.location.origin;
  switch(location) {
  case dataRedirectURI.localhost:
    return dataRedirectURI.localhost;
  case dataRedirectURI.visitkiDev:
    return dataRedirectURI.visitkiDev;
  case dataRedirectURI.visitki:
    return dataRedirectURI.visitki
  default:
    return '';      
  }
}
