import { Response, Request, NextFunction } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const yandex = {
  CLIENT_ID: '6588f39ea0274d599d3c60fb10c53556',
  CLIENT_SECRET: '0b81a854811c449fa333c98c0e44c806',
  CALLBACK_URL: 'http://127.0.0.1:3000/auth/yandex/callback',
  OATH_URL: 'https://oauth.yandex.ru/authorize?response_type=code',
  TOKEN_URL: 'https://oauth.yandex.ru/token',
  PROFILE_URL: 'https://login.yandex.ru/info?format=json',
};

const curatorList = ['curator_1@yandex.ru', 'curator_2@yandex.ru'];


export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.body  //req.query.code as string;
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


  User.findOne({email: userProfile.default_email})
  .then((user) => {
    let token;
    if(user){
      token = jwt.sign({ _id: user._id,
        name: userProfile.first_name,
        email: userProfile.default_email,
        cohort: user.cohort,
        photo: user.profile?.photo,
        role: 'student' },
         'strong-secret',
       { expiresIn: '7d' });
    }
    const isCurator = curatorList.includes(userProfile.default_email);
    if(isCurator){
      token = jwt.sign({ _id: null,
        role: 'curator' },
         'strong-secret',
       { expiresIn: '7d' });
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
    //next(new UnauthorizedError('Необходима авторизация'));
  });
};
