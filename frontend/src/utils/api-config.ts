import { BASE_URL } from './constants';
import { IProfile } from './types';

class Api {
  private _baseUrl: string;

  constructor(data: string) {
    this._baseUrl = data;
  }

  // вспомогательная функция проверки на ошибку возвращающая либо ОК ,либо ОШИБКУ
  _parseResponse = (res: Response) =>
    res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));

  // USERS

  // Отправка данных пользователя - POST - {{baseUrl}}/users
  postUsers(accessToken: string, body: { email: string; cohort: string }) {
    return fetch(`${this._baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
      body: JSON.stringify(body),
    }).then((res) => this._parseResponse(res));
  }

  // Запрос пользователей - GET - {{baseUrl}}/users?offset=<integer>&limit=20&search=<string>
  getUsers(accessToken: string, offset: number, limit: number, search: string) {
    return fetch(`${this._baseUrl}/users?offset=${offset}&limit=${limit}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
    }).then((res) => this._parseResponse(res));
  }

  // Создание/замена данных пользователя - PUT - {{baseUrl}}/users/:id
  putUsers(accessToken: string, body: { email: string; cohort: string }, id: string) {
    return fetch(`${this._baseUrl}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
      body: JSON.stringify(body),
    }).then((res) => this._parseResponse(res));
  }

  // COMMENTS

  // Запрос комментариев - GET - {{baseUrl}}/comments?offset=<integer>&limit=20&search=<string>
  getComments(accessToken: string, offset: number, limit: number, search: string) {
    return fetch(`${this._baseUrl}/comments?offset=${offset}&limit=${limit}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
    }).then((res) => this._parseResponse(res));
  }

  // Удаление данных комментариев по id - DELETE - {{baseUrl}}/comments/:id
  deleteComments(accessToken: string, id: string) {
    return fetch(`${this._baseUrl}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
    }).then((res) => this._parseResponse(res));
  }

  // PROFILE

  // Запрос профиля - GET - {{baseUrl}}/profiles?offset=<integer>&limit=20&cohort=<string>
  getProfile(accessToken: string, offset: number, limit: number, search: string) {
    return fetch(`${this._baseUrl}/profiles?offset=${offset}&limit=${limit}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
    }).then((res) => this._parseResponse(res));
  }

  // Запрос профиля - GET - {{baseUrl}}/profiles/:id
  getProfileById(accessToken: string, id: string) {
    return fetch(`${this._baseUrl}/profiles/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
    }).then((res) => this._parseResponse(res));
  }

  // Частичная замена данных профиля - PATCH - {{baseUrl}}/profiles/:id
  patchProfile(accessToken: string, body: IProfile, id: string) {
    return fetch(`${this._baseUrl}/profiles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
      body: JSON.stringify(body),
    }).then((res) => this._parseResponse(res));
  }

  // REACTIONS

  // Запрос реакций - GET - {{baseUrl}}/profiles/:id/reactions?offset=<integer>&limit=20
  getReactions(accessToken: string, offset: number, limit: number, search: string) {
    return fetch(`${this._baseUrl}/profiles?offset=${offset}&limit=${limit}&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
    }).then((res) => this._parseResponse(res));
  }

  // Отправка реакций - POST - {{baseUrl}}/profiles/:id/reactions
  postReactions(accessToken: string, body: { target: string; text: string }) {
    return fetch(`${this._baseUrl}/profiles/:id/reactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: accessToken,
      },
      body: JSON.stringify(body),
    }).then((res) => this._parseResponse(res));
  }

  // ОПЕРАЦИИ С ТОКЕНОМ И ВЫХОД ИЗ ПРОФИЛЯ???:

  // Запрос для обновления токена
  postRefreshToken(refreshToken: string) {
    return fetch(`${this._baseUrl}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    }).then((res) => this._parseResponse(res));
  }

  // Запрос на выход из системы
  postLogout(refreshToken: string) {
    return fetch(`${this._baseUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: refreshToken,
      }),
    }).then((res) => this._parseResponse(res));
  }
}

export default new Api(BASE_URL);
