import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import 'isomorphic-fetch';
import { rateLimit } from 'express-rate-limit';
import { PORT, DB_URL } from './config/config';
import { login } from './controllers/oauth';

// import { Reaction, EmotionReaction } from './models/Reaction';


const yandex = {
  CLIENT_ID: '6588f39ea0274d599d3c60fb10c53556',
  CLIENT_SECRET: '0b81a854811c449fa333c98c0e44c806',
  CALLBACK_URL: 'http://127.0.0.1:3000/auth/yandex/callback',
  OATH_URL: 'https://oauth.yandex.ru/authorize?response_type=code',
  TOKEN_URL: 'https://oauth.yandex.ru/token',
  PROFILE_URL: 'https://login.yandex.ru/info?format=json',
};


const app = express();


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

app.get('/auth/yandex/callback', login);

app.use(limiter);
app.use(helmet());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
