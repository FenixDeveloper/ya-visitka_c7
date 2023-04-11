import imgOne from '../assets/icons/girl.png'
import imgTwo from '../assets/icons/guitar.png'
export const DEFAULT_PAGE = 'DEFAULT_PAGE';
export const ROMANTIC_PAGE = 'ROMANTIC_PAGE';
export const COCKY_PAGE = 'COCKY_PAGE';
export const EXAMPLE_CURRENT_USER: { name: string, avatar?: string, pageStyle: typeof DEFAULT_PAGE | typeof ROMANTIC_PAGE | typeof COCKY_PAGE } = {
  name: 'Константин Константинович',
  avatar: 'https://s0.rbk.ru/v6_top_pics/media/img/4/99/756723917919994.webp',
  pageStyle: DEFAULT_PAGE,
};

export const EXAMPLE_DEFAUT_ARR = ['Петровск (Саратовская область)', 'Петровск-Забайкальский (Забайкальский край)',
  'Петрозаводск (Республика Карелия)', 'Петропавловск-Камчатский (Камчатский край)'];

export const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export const BASE_URL = 'https://visitki.practicum-team.ru/api';
export const GITHUB_URL = 'https://api.github.com/';
export const TELEGRAM_URL = 'https://tlgg.ru/test'
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
