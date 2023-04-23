import { IFile, IProfile, IUserRequest } from '../services/types/data';
import { BASE_URL, GITHUB_URL } from './constants';

class Api {
  private _baseUrl: string;
  public accessToken: string;

  constructor(data: string) {
    this._baseUrl = data;
    this.accessToken = localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '';
  }

  // вспомогательная функция проверки на ошибку возвращающая либо ОК ,либо ОШИБКУ
  _parseResponse = (res: Response) =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(console.log('Ошибка', err)));

  // TOKENS
  // Получение токена из кода подтверждения
  getToken(code: string) {
    return fetch(`${this._baseUrl}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ code }),
    }).then((res) => this._parseResponse(res));
  }

  // Получение данных о авторизованном пользователе
  getUserAuth() {
    const token = localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '';
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    }).then((res) => this._parseResponse(res));
  }

  // USERS FOR CURATOR
  // Отправка данных пользователя - POST - {{baseUrl}}/users
  postUsers(body: IUserRequest) {
    const token = localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '';
    return fetch(`${this._baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
      body: JSON.stringify(body),
    }).then((res) => this._parseResponse(res));
  }

  // Запрос пользователей - GET - {{baseUrl}}/users?offset=<integer>&limit=20&search=<string>
  getUsers(offset: number, limit: number, search: string) {
    const token = localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '';
    return fetch(
      `${this._baseUrl}/users?offset=${offset}&limit=${limit}&search=${search}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: token,
        },
      }
    ).then((res) => this._parseResponse(res));
  }

  // Создание/замена данных пользователя - PUT - {{baseUrl}}/users/:id
  putUsers(body: IUserRequest, id: string) {
    const token = localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '';
    return fetch(`${this._baseUrl}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
      body: JSON.stringify(body),
    }).then((res) => this._parseResponse(res));
  }

  // COMMENTS
  // Запрос комментариев - GET - {{baseUrl}}/comments?offset=<integer>&limit=20&search=<string>
  getComments(offset: number, limit: number, search: string) {
    const token = localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '';
    return fetch(
      `${this._baseUrl}/comments?offset=${offset}&limit=${limit}&search=${search}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: token,
        },
      }
    ).then((res) => this._parseResponse(res));
  }

  // Удаление данных комментариев по id - DELETE - {{baseUrl}}/comments/:id
  deleteComments(id: string) {
    const token = localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '';
    return fetch(`${this._baseUrl}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    }).then((res) => this._parseResponse(res));
  }

  // PROFILE FOR USERS
  // Запрос профиля - GET - {{baseUrl}}/profiles?offset=<integer>&limit=20&cohort=<string>
  getProfile(offset: number, limit: number, cohort: string) {
    const token = localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '';
    return fetch(
      `${this._baseUrl}/profiles?offset=${offset}&limit=${limit}&cohort=${cohort}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: token,
        },
      }
    ).then((res) => this._parseResponse(res));
  }

  // Запрос профиля - GET - {{baseUrl}}/profiles/:id
  getProfileById(id: string) {
    const token = localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '';
    return fetch(`${this._baseUrl}/profiles/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    }).then((res) => this._parseResponse(res));
  }

  // Частичная замена данных профиля - PATCH - {{baseUrl}}/profiles/:id
  patchProfile(body: IProfile, id: string) {
    const token = localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '';
    return fetch(`${this._baseUrl}/profiles/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
      body: JSON.stringify(body),
    }).then((res) => this._parseResponse(res));
  }

  // REACTIONS
  // Запрос реакций - GET - {{baseUrl}}/profiles/:id/reactions?offset=<integer>&limit=20
  getReactions(id: string, offset: number, limit: number) {
    const token = localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '';
    return fetch(
      `${this._baseUrl}/profiles/${id}/reactions?offset=${offset}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: token,
        },
      }
    ).then((res) => this._parseResponse(res));
  }

  // Отправка реакций - POST - {{baseUrl}}/profiles/:id/reactions
  postReactions(id: string, body: { target: string; text: string }) {
    const token = localStorage.getItem('accessToken') ? `Bearer ${localStorage.getItem('accessToken')}` : '';
    return fetch(`${this._baseUrl}/profiles/${id}/reactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
      body: JSON.stringify(body),
    }).then((res) => this._parseResponse(res));
  }

  // FILES
  postAddFiles(body: IFile) {
    const { hobby, status, job, education, avatar } = body;
    const formData = new FormData();
    formData.append('hobby', hobby);
    formData.append('status', status);
    formData.append('job', job);
    formData.append('education', education);
    formData.append('avatar', avatar);

    return fetch(`${this._baseUrl}/files`, {
      method: 'POST',
      body: formData,
    }).then((res) => this._parseResponse(res));
  }

  getFile(nameFile: string) {
    return fetch(`${this._baseUrl}/files/${nameFile}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }
    ).then((res) => this._parseResponse(res));
  }

  checkExistUserGitHub(nickname: string) {
    return fetch(`${GITHUB_URL}/users/${nickname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => this._parseResponse(res));
  }
}

export const api = new Api(BASE_URL);
