import { UserStatus } from '../services/types/data';
import imgOne from '../assets/icons/girl.png'
import imgTwo from '../assets/icons/guitar.png'
import { getCurrentRedirectURI } from './utils';

export const BASE_URL = 'http://localhost:4000/api';
export const GITHUB_URL = 'https://api.github.com';
export const TELEGRAM_URL = 'https://tlgg.ru/test';
export const CLIENT_ID = '6588f39ea0274d599d3c60fb10c53556';

export const DATA_REDIRECT_URI = {
  localhost: 'http://localhost:3000',
  visitkiDev: 'https://visitki-dev.team-7.practicum-team.ru/',
  visitki: 'https://visitki.team-7.practicum-team.ru/',
}

export const CURRENT_REDIRECT_URI = getCurrentRedirectURI(DATA_REDIRECT_URI)

export const EXAMPLE_VISITKAS = [
  {
    _id: '1',
    profile: {
      name: 'Qwerty',
      photo: 'https://i.pravatar.cc/325',
      city: 'Петровск (Саратовская область)',
    }
  },
  {
    _id: '2',
    profile: {
      name: 'Qwerty',
      photo: 'https://i.pravatar.cc/325',
      city: 'Петровск (Саратовская область)',
    }
  },
  {
    _id: '3',
    profile: {
      name: 'Qwerty',
      photo: 'https://i.pravatar.cc/325',
      city: 'Петровск (Саратовская область)',
    }
  },
  {
    _id: '4',
    profile: {
      name: 'Qwerty',
      photo: 'https://i.pravatar.cc/325',
      city: 'Петровск (Саратовская область)',
    }
  },
];

export const EXAMPLE_CURRENT_USER: {
  _id?: string;
  name?: string;
  photo?: string;
  role: UserStatus;
  pattern?: 'серьезный' | 'романтичный' | 'дерзкий';
  email: string;
  cohort?: string;
} = {
  _id: '11111',
  name: 'Константин Константинович',
  photo: 'https://avatars.githubusercontent.com/u/85547727?v=4',
  pattern: 'серьезный',
  email: 'email@email.ru',
  cohort: '1111',
  role: UserStatus.STUDENT,
};

export const EXAMPLE_DEFAUT_ARR = [
  'Петровск (Саратовская область)',
  'Петровск-Забайкальский (Забайкальский край)',
  'Петрозаводск (Республика Карелия)',
  'Петропавловск-Камчатский (Камчатский край)',
];

export const DEFAULT_PAGE = 'DEFAULT_PAGE';
export const ROMANTIC_PAGE = 'ROMANTIC_PAGE';
export const COCKY_PAGE = 'COCKY_PAGE';

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

export const VALIDATION_ERRORS = {
  FIELD_LENGTH: (minLength: number, maxLength: number) =>
    `Длина поля должна быть не менее ${minLength} и не более ${maxLength} символов`,
  EMAIL_INVALID: 'Ваша почта не подходит',
  TELEGRAM_INVALID: 'Ник в телеграме должен иметь длину от 5 до 32 символов',
  GITHUB_USER_NOT_FOUND: 'Пользователя с таким ником не существует',
  IMAGE_TYPE_INVALID: 'Изображение должно быть одного из форматов jpg, jpeg, png, bmp',
  IMAGE_SIZE_INVALID: (maxSize: string) =>
    `Изображение слишком большое, максимальный допустимый размер: ${maxSize}`,
};

export const VALIDATION = {
  IMAGE: /^https:\/\/([^\s(["<,>/]*)(\/)[^\s[",><]*\.(png|jpg|jpeg|bmp)(\?[^\s[",><]*)?/,
  EMAIL: /^[^.](?=[a-z\d!#$%&'*+\-\\/=?.^_`{}|~]+@([a-z-.\d]+\.)+[a-z]{2,}$)((?!\.\.).)*$/i,
  TELEGRAM: /^[a-zA-Z0-9_]{5,32}$/i,
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
]

export const EXAMPLE_USER_ARRAY: { id: string, cohort: string, name: string, email: string }[] = [
  {
    id: '1',
    cohort: '1234',
    name: 'Vasya Pupkin',
    email: 'vasyap@yandex.ru'
  },
  {
    id: '2',
    cohort: '1234',
    name: 'Petya Petkin',
    email: 'petyap@yandex.ru'
  },
  {
    id: '3',
    cohort: '4321',
    name: 'Ivan Ivanov',
    email: 'ivani@yandex.ru'
  },
  {
    id: '4',
    cohort: '4321',
    name: 'Konstantin Konstantinov',
    email: 'kostyak@yandex.ru'
  }
];

export const EXAMPLE_USER_BLOGS = [
  {
    title: 'Увлечения',
    urlImage: `${imgTwo}`,
    text: 'Увлекаюсь программированием, игрой на гитаре, вышиваю крестиком и играю в настолки. Увлекаюсь программированием, игрой на гитаре, вышиваю крестиком и играю в настолки. Увлекаюсь программированием, игрой на гитаре, вышиваю крестиком и играю в настолки.',
  },
  {
    title: 'Семья',
    urlImage: `${imgOne}`,
    text: 'Замужем, двое детей, собака. Живу в городе Калуга, люблю этот маленький городок. С собакой часто ходим на прогулки и наблюдаем за природой',
  },
  {
    title: 'Сфера',
    urlImage: '',
    text: 'Работаю в сфере гостиничного бизнеса, управляющим отелем. Люблю работать с людьми, постоянно вижу новых людей, общаюсь с посетителями, управляю персоналом, обучаю и принимаю на работу новых сотрудников.',
  },
  {
    title: 'Учеба',
    urlImage: '',
    text: 'Надоело работать в одной сфере, хочу сменить деятельность, нет шансов на рост, хочу быть айтишником. В детстве любила информатику, компьютерные игры и разбираться с программами. Вот вспомнила деские мечты и решила воплотить их в реальность. Надеюсь, что у меня все получится.',
  },
];

export const EXAMPLE_MESSAGES = [
  {
    message: 'Классные у тебя увлечения, я тоже играю в настолки, любимая игра — Эволюция. Люблю еще музыку слушать и отдыхать на природе. 🤣',
  },
  {
    message: 'Классные у тебя увлечения, я тоже играю в настолки, любимая игра — Эволюция. Люблю еще музыку слушать и отдыхать на природе. 🤣',
  },
];

export const EXAMPLE_COMMENTS = [
  {
    _id: '81ffe58b6fe8dac5328b4f5e',
    from: {
      _id: '88fd917fb9ce1ebbacf35dcb',
      name: 'Name Lastname',
      email: 'Buster_Murphy@hotmail.com',
      cohort: '444',
    },
    target: 'hobby',
    text: 'Fugit sint occaecati dicta unde eaque.',
    to: {
      _id: 'a67fdbbc9e4a2f7d962c795c',
      name: 'Gordon A',
      email: 'Kayli72@hotmail.com',
      cohort: 'web+16',
    },
  },
  {
    _id: '0c742efe72f6bc7a140863d6',
    from: {
      _id: '88fd917fb9ce1ebbacf35dcb',
      name: 'Alex Alex',
      email: 'Buster_Murphy@hotmail.com',
      cohort: '333',
    },
    target: 'edu',
    text: 'Quas recusandae illo temporibus saepe repudiandae optio eligendi quas pariatur.',
    to: {
      _id: 'a67fdbbc9e4a2f7d962c795c',
      name: 'Bob Bob',
      email: 'Kayli72@hotmail.com',
      cohort: 'web+16',
    },
  },
  {
    _id: '47addcbfe138dbdfbecefcd5',
    from: {
      _id: '88fd917fb9ce1ebbacf35dcb',
      name: 'Ivan Ivanov',
      email: 'Buster_Murphy@hotmail.com',
      cohort: '1234',
    },
    target: 'status',
    text: 'Классные у тебя увлечения, я тоже играю в настолки, любимая игра — Эволюция. Люблю еще слушать музыку, ходить в кино, общаться с друзьями. Ну и учиться в Практикуме.',
    to: {
      _id: 'a67fdbbc9e4a2f7d962c795c',
      name: 'Max Max',
      email: 'Kayli72@hotmail.com',
      cohort: 'web+16',
    },
  },
  {
    _id: '61c4da18bc63b512fffbe70f',
    from: {
      _id: '88fd917fb9ce1ebbacf35dcb',
      name: 'Brendan Fadel',
      email: 'Buster_Murphy@hotmail.com',
      cohort: 'web+16',
    },
    target: 'job',
    text: 'Dicta placeat voluptates quaerat odio neque minima.78555555555555555555555555555555',
    to: {
      _id: 'a67fdbbc9e4a2f7d962c795c',
      name: 'Gordon Anderson',
      email: 'Kayli72@hotmail.com',
      cohort: 'web+16',
    },
  },
  {
    _id: 'd45e2dbcd98fce99bfaeef61',
    from: {
      _id: '88fd917fb9ce1ebbacf35dcb',
      name: 'Brendan Fadel',
      email: 'Buster_Murphy@hotmail.com',
      cohort: 'web+16',
    },
    target: 'quote',
    text: 'Ipsa amet autem cum.',
    to: {
      _id: 'a67fdbbc9e4a2f7d962c795c',
      name: 'Gordon Anderson',
      email: 'Kayli72@hotmail.com',
      cohort: 'web+16',
    },
  },
  {
    _id: 'eff84876fbd0d069fde0d5fb',
    from: {
      _id: '88fd917fb9ce1ebbacf35dcb',
      name: 'Brendan Fadel',
      email: 'Buster_Murphy@hotmail.com',
      cohort: 'web+16',
    },
    target: 'quote',
    text: 'Tempora veritatis commodi est dicta doloremque animi dicta.',
    to: {
      _id: 'a67fdbbc9e4a2f7d962c795c',
      name: 'Gordon Anderson',
      email: 'Kayli72@hotmail.com',
      cohort: 'web+16',
    },
  },
];
