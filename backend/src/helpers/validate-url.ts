/* eslint-disable no-useless-escape */

import { BadRequestError } from '../errors';
import ErrorMessages from './error-messages';

export const urlRegex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
export const imageOrTempIdRegex = /^((https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|bmp|webp|tiff|ico))|(?:[A-Za-z0-9_-]{6,12}))$/;
export const cohortRegex = /^[A-Za-z0-9+_\-]+$/;

export const isUrlValid = (url: string): string | never => {
  if (!urlRegex.test(url)) {
    throw new BadRequestError(ErrorMessages.BadRequest);
  }

  return url;
};

export const isEmailValid = (email: string): string | never => {
  if (!emailRegex.test(email)) {
    throw new BadRequestError(ErrorMessages.BadRequest);
  }

  return email;
};

export const isCohortValid = (cohort: string): string | never => {
  if (!cohortRegex.test(cohort)) {
    throw new BadRequestError(ErrorMessages.BadRequest);
  }

  return cohort;
};
