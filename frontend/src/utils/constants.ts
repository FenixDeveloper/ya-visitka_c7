import { UserStatus } from '../services/types/data';

export const EXAMPLE_CURRENT_USER: { _id: string, name: string, avatar?: string, status: UserStatus} = {
  _id: '11111',
  name: 'Константин Константинович',
  avatar: 'https://avatars.githubusercontent.com/u/85547727?v=4',
  status: UserStatus.Student
};

export const EXAMPLE_DEFAUT_ARR = ['Петровск (Саратовская область)', 'Петровск-Забайкальский (Забайкальский край)',
  'Петрозаводск (Республика Карелия)', 'Петропавловск-Камчатский (Камчатский край)'];

export const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
  'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export const BASE_URL = 'https://visitki.practicum-team.ru/api';
export const GITHUB_URL = 'https://api.github.com/';
export const DEFAULT_PAGE = 'DEFAULT_PAGE';
export const ROMANTIC_PAGE = 'ROMANTIC_PAGE';
export const COCKY_PAGE = 'COCKY_PAGE';
