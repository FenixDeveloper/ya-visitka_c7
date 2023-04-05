import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const yandex = {
  CLIENT_ID: '6588f39ea0274d599d3c60fb10c53556',
  CLIENT_SECRET: '0b81a854811c449fa333c98c0e44c806',
  CALLBACK_URL: 'http://127.0.0.1:3000/auth/yandex/callback',
  OATH_URL: 'https://oauth.yandex.ru/authorize?response_type=code',
  TOKEN_URL: 'https://oauth.yandex.ru/token',
  PROFILE_URL: 'https://login.yandex.ru/info?format=json',
};

const curatorList = ['curator_1@yandex.ru', 'curator_2@yandex.ru'];

const getUserProfileYndex = async (code: string) => {
  const response = await fetch(yandex.TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: yandex.CLIENT_ID,
      client_secret: yandex.CLIENT_SECRET,
    }),
  });
  const { access_token } = await response.json();

  const userResponse = await fetch(yandex.PROFILE_URL, {
    headers: { Authorization: `OAuth${access_token}` },
  });

  const userProfile = await userResponse.json();
  return userProfile;
};

const getToken = (user: any) => jwt.sign(user, 'secret', { expiresIn: '7d' });

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.body;

  const userProfile = await getUserProfileYndex(code) as any;

  User.findOne({ email: userProfile.default_email })
    .then((user) => {
      let token;

      if (user) {
        const student = {
          _id: user._id,
          name: userProfile.first_name,
          email: user.email,
          cohort: user.cohort,
          photo: user.profile?.photo,
          role: 'student',
        };

        token = getToken(student);
      }
      const isCurator = curatorList.includes(userProfile.default_email);

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
    // next(new UnauthorizedError('Необходима авторизация'));
    });
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;

  const { role, email } = jwt.decode(token) as any;
  if (role === 'student') {
    const { id, name, cohort } = jwt.decode(token) as any;
    return res.send({
      id, name, email, cohort, role,
    });
  }

  if (role === 'curator') {
    return res.send({ email, role });
  }
};
