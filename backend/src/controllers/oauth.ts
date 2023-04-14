import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { CLIENT_ID, CLIENT_SECRET, CURATOR_LIST } from '../config/config';
import UnauthorizedError from '../errors/unauthorized-error';
import NotFoundError from '../errors/not-found-error';
import ErrorMessages from '../helpers/error-messages';
import { IUserPayload, IUserProfileYandex } from '../types/user-payload';

const yandex = {
  CALLBACK_URL: 'http://127.0.0.1:3000/auth/yandex/callback',
  OATH_URL: 'https://oauth.yandex.ru/authorize?response_type=code',
  TOKEN_URL: 'https://oauth.yandex.ru/token',
  PROFILE_URL: 'https://login.yandex.ru/info?format=json',
};

const getUserProfileYandex = async (code: string) => {
  try {
    const response = await fetch(yandex.TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });
    /* eslint-disable camelcase */
    const { access_token } = await response.json();
    if (!access_token) throw new UnauthorizedError(ErrorMessages.Unauthorized);
    const userResponse = await fetch(yandex.PROFILE_URL, {
      headers: { Authorization: `OAuth${access_token}` },
    });

    const userProfile = await userResponse.json();
    if (!userProfile) throw new UnauthorizedError(ErrorMessages.Unauthorized);
    const user: IUserProfileYandex = {
      email: userProfile.default_email,
      name: userProfile.first_name,
    };
    return user;
  } catch (error) {
    throw new UnauthorizedError(ErrorMessages.Unauthorized);
  }
};

const getToken = (user: IUserPayload) => jwt.sign(user, 'secret', { expiresIn: '7d' });

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.body;
    if (!code) throw new UnauthorizedError(ErrorMessages.Unauthorized);
    const userProfile = await getUserProfileYandex(code);

    const email = userProfile.email.toLowerCase()

    User.findOne({ email: email }).then((user) => {
      let token;
      if (user) {
        const student: IUserPayload = {
          _id: user._id,
          name: userProfile.name,
          email: user.email,
          cohort: user.cohort,
          role: 'student',
        };

        token = getToken(student);
      }
      const isCurator = CURATOR_LIST.toLowerCase().split(',').includes(email);
      if (isCurator) {
        const curator: IUserPayload = {
          _id: null,
          email: email,
          role: 'curator',
        };
        token = getToken(curator);
      }
      if(!token) throw new NotFoundError(ErrorMessages.UserNotFound);
      res.send({ token });
    }).catch(next);
  } catch (error) {
    next(error);
  }
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedError(ErrorMessages.Unauthorized);

    const { role, email } = jwt.decode(token) as IUserPayload;
    if (role === 'student') {
      const {
        _id, name, cohort
      } = jwt.decode(token) as IUserPayload;
      return res.send({
        _id, name, email, cohort, role
      });
    }

    if (role === 'curator') {
      return res.send({ email, role });
    }
  } catch (error) {
    next(error);
  }
  return false;
};
