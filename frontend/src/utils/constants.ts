import { UserStatus } from '../services/types/data';

export const EXAMPLE_VISITKAS = [
  {
    id: '1',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петровск (Саратовская область)',
  },
  {
    id: '2',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петровск-Забайкальский (Забайкальский край)',
  },
  {
    id: '3',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петрозаводск (Республика Карелия)',
  },
  {
    id: '4',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петропавловск-Камчатский (Камчатский край)',
  },
  {
    id: '5',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петровск (Саратовская область)',
  },
  {
    id: '6',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петровск-Забайкальский (Забайкальский край)',
  },
  {
    id: '7',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петрозаводск (Республика Карелия)',
  },
  {
    id: '8',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петропавловск-Камчатский (Камчатский край)',
  },
  {
    id: '9',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петровск (Саратовская область)',
  },
  {
    id: '10',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петровск (Саратовская область)',
  },
  {
    id: '11',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петровск (Саратовская область)',
  },
  {
    id: '12',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петровск (Саратовская область)',
  },
  {
    id: '13',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петровск (Саратовская область)',
  },
  {
    id: '14',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петровск (Саратовская область)',
  },
  {
    id: '15',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петровск (Саратовская область)',
  },
  {
    id: '16',
    name: 'Qwerty',
    photo: 'https://i.pravatar.cc/325',
    city: 'Петровск (Саратовская область)',
  },
];

export const EXAMPLE_CURRENT_USER: {
  _id: string;
  name: string;
  avatar?: string;
  status?: UserStatus;
} = {
  _id: '11111',
  name: 'Константин Константинович',
  avatar: 'https://avatars.githubusercontent.com/u/85547727?v=4',
  status: UserStatus.Student,
};

export const EXAMPLE_DEFAUT_ARR = [
  'Петровск (Саратовская область)',
  'Петровск-Забайкальский (Забайкальский край)',
  'Петрозаводск (Республика Карелия)',
  'Петропавловск-Камчатский (Камчатский край)',
];

export const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const BASE_URL = 'https://visitki.practicum-team.ru/api';

export const GITHUB_URL = 'https://api.github.com';
export const DEFAULT_PAGE = 'DEFAULT_PAGE';
export const ROMANTIC_PAGE = 'ROMANTIC_PAGE';
export const COCKY_PAGE = 'COCKY_PAGE';

export const VALIDATION_ERRORS = {
  FIELD_LENGTH: (minLength: number, maxLength: number) =>
    `Длина поля должна быть не менее ${minLength} и не более ${maxLength} символов`,
  EMAIL_INVALID: 'Ваша почта не подходит',
  TELEGRAM_INVALID: 'Ник в телеграме должен начинаться с @ и иметь длину от 5 до 32 символов',
  GITHUB_USER_NOT_FOUND: 'Пользователя с таким ником не существует',
  IMAGE_TYPE_INVALID: 'Изображение должно быть одного из форматов jpg, jpeg, png, bmp',
  IMAGE_SIZE_INVALID: (maxSize: string) =>
    `Изображение слишком большое, максимальный допустимый размер: ${maxSize}`,
};

export const VALIDATION = {
  IMAGE: /^https:\/\/([^\s(["<,>/]*)(\/)[^\s[",><]*\.(png|jpg|jpeg|bmp)(\?[^\s[",><]*)?/,
  EMAIL: /^[^.](?=[a-z\d!#$%&'*+\-\\/=?.^_`{}|~]+@([a-z-.\d]+\.)+[a-z]{2,}$)((?!\.\.).)*$/i,
  TELEGRAM: /^@[a-zA-Z0-9_]{5,32}$/i,
};

export const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/bmp'];

export const PATTERN_ARR = ['серьезный', 'романтичный', 'дерзкий'];

export const EMOJI = [
  { symbol: '👍', alt: 'палец вверх', acitve: false, counter: 1 },
  { symbol: '👎️', alt: 'палец вниз', acitve: false, counter: 2 },
  { symbol: '👋️', alt: 'машет рукой', acitve: true, counter: 3 },
  { symbol: '🙂️', alt: 'слегка улыбается', acitve: false, counter: 4 },
  { symbol: '😞️', alt: 'разочарование', acitve: false, counter: 5 },
  { symbol: '🤣️', alt: 'катается со смеху', acitve: false, counter: 6 },
  { symbol: '😬️', alt: 'лицо с гримасой', acitve: false, counter: 7 },
  { symbol: '😱️', alt: 'в ужасе', acitve: false, counter: 8 },
  { symbol: '😍️', alt: 'улыбающееся лицо с глазами-сердечками', acitve: false, counter: 9 },
  { symbol: '🖤', alt: 'сердце', acitve: false, counter: 10 },
];
