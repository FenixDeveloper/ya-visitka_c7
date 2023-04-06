import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { CLIENT_ID, CLIENT_SECRET, CURATOR_LIST } from '../config/config';
import UnauthorizedError from '../errors/unauthorized-error';
import ErrorMessages from '../helpers/error-messages';

const yandex = {
  CALLBACK_URL: 'http://127.0.0.1:3000/auth/yandex/callback',
  OATH_URL: 'https://oauth.yandex.ru/authorize?response_type=code',
  TOKEN_URL: 'https://oauth.yandex.ru/token',
  PROFILE_URL: 'https://login.yandex.ru/info?format=json',
};

interface IUser {
  id?: any;
  name?: string;
  email?: string;
  photo?: string;
  cohort?: string;
  role?: string;
}

const getUserProfileYandex = async (code: string) => {
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
  const { access_token } = await response.json();
  if (!access_token) throw new UnauthorizedError(ErrorMessages.Unauthorized);

  const userResponse = await fetch(yandex.PROFILE_URL, {
    headers: { Authorization: `OAuth${access_token}` },
  });

  const userProfile = await userResponse.json();
  if (!userProfile) throw new UnauthorizedError(ErrorMessages.Unauthorized);
  return userProfile;
};

const getToken = (user: IUser) => jwt.sign(user, 'secret', { expiresIn: '7d' });

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.body;
  if (!code) throw new UnauthorizedError(ErrorMessages.Unauthorized);

  const userProfile = await getUserProfileYandex(code) as any;

  User.findOne({ email: userProfile.default_email })
    .then((user) => {
      let token;

      if (user) {
        const student = {
          id: user._id,
          name: userProfile.first_name,
          email: user.email,
          cohort: user.cohort,
          photo: user.profile?.photo,
          role: 'student',
        };

        token = getToken(student);
      }
      const isCurator = CURATOR_LIST.includes(userProfile.default_email);

      if (isCurator) {
        const curator = {
          email: userProfile.default_email,
          role: 'curator',
        };

        token = getToken(curator);
      }

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .send({
          token,
        });
    })
    .catch(() => {
      next(new UnauthorizedError(ErrorMessages.Unauthorized));
    });
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new UnauthorizedError(ErrorMessages.Unauthorized);

  const { role, email } = jwt.decode(token) as IUser;
  if (role === 'student') {
    const {
      id, name, cohort, photo,
    } = jwt.decode(token) as IUser;
    return res.send({
      id, name, email, cohort, role, photo,
    });
  }

  if (role === 'curator') {
    return res.send({ email, role });
  }
};
