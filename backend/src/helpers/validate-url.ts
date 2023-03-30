/* eslint-disable no-useless-escape */

export const urlRegex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

export const isUrlValid = (url: string): Boolean => urlRegex.test(url);
export const isEmailValid = (email: string): Boolean => emailRegex.test(email);
