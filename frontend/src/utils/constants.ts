export const EXAMPLE_CURRENT_USER: { name: string, avatar?: string; } = {
  name: 'Константин Константинович',
  avatar: 'https://avatars.githubusercontent.com/u/85547727?v=4',
};

export const EXAMPLE_DEFAUT_ARR = ['Петровск (Саратовская область)', 'Петровск-Забайкальский (Забайкальский край)',
  'Петрозаводск (Республика Карелия)', 'Петропавловск-Камчатский (Камчатский край)'];

export const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export const BASE_URL = 'https://visitki.practicum-team.ru/api';
export const GITHUB_URL = 'https://api.github.com';

export const IMAGEVALIDATION = /^https:\/\/([^\s(["<,>/]*)(\/)[^\s[",><]*\.(png|jpg|jpeg|bmp)(\?[^\s[",><]*)?/;

export const EMAILVALIDATION = /^[^.](?=[a-z\d!#$%&'*+\-\\/=?.^_`{}|~]+@([a-z-.\d]+\.)+[a-z]{2,}$)((?!\.\.).)*$/i;

export const TELEGRAMVALIDATION = /^@[a-zA-Z0-9_]{5,32}$/i;

export const IMAGETYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/bmp'];
