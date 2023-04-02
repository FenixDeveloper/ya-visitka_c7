import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import helmet from 'helmet';
import 'isomorphic-fetch';
import jwt from 'jsonwebtoken';
import { rateLimit } from 'express-rate-limit';
import { PORT, DB_URL } from './config/config';
import User from './models/User';

// import { Reaction, EmotionReaction } from './models/Reaction';
// const jwt = require('jsonwebtoken');

const yandex = {
  CLIENT_ID: '6588f39ea0274d599d3c60fb10c53556',
  CLIENT_SECRET: '0b81a854811c449fa333c98c0e44c806',
  CALLBACK_URL: 'http://127.0.0.1:3000/auth/yandex/callback',
  OATH_URL: 'https://oauth.yandex.ru/authorize?response_type=code',
  TOKEN_URL: 'https://oauth.yandex.ru/token',
  PROFILE_URL: 'https://login.yandex.ru/info?format=json',
};
const curatorList = ['curator_1@yandex.ru', 'curator_2@yandex.ru'];

const app = express();

let userProfile: any;
let code: any;

const limiter = rateLimit({
  windowMs: 16 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

mongoose.connect(DB_URL);

app.get('/auth/yandex', async (req, res) => {
  await res.redirect(`${yandex.OATH_URL}&client_id=${yandex.CLIENT_ID}`);
});
app.get('/auth/yandex/callback', async (req, res) => {
  code = req.query.code as string;
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
  userProfile = await userResponse.json();
  res.send(console.log(userProfile));
});

app.use(limiter);
app.use(helmet());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
