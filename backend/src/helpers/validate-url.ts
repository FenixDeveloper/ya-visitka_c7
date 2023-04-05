/* eslint-disable no-useless-escape */

export const urlRegex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
export const imageOrTempIdRegex = /^((https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|bmp|webp|tiff|ico))|(?:[A-Za-z0-9_-]{6,12}))$/;
export const cohortRegex = /^[A-Za-z0-9+_\-]+$/;

export const isUrlValid = (url: string): Boolean => urlRegex.test(url);
export const isEmailValid = (email: string): Boolean => emailRegex.test(email);
export const isCohortValid = (cohort: string): Boolean => cohortRegex.test(cohort);
