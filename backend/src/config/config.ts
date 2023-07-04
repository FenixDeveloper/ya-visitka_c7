import { config } from 'dotenv';
import { join } from 'path';

config({
  path: join(__dirname, '..', '..', '.env'),
});

const {
  PORT = 4000,
  JWT_SECRET = 'super-secret-word',
  NODE_ENV = 'production',
  DB_URL = 'mongodb://127.0.0.1:27017/visitka',
  CLIENT_ID = '6588f39ea0274d599d3c60fb10c53556',
  CLIENT_SECRET = '0b81a854811c449fa333c98c0e44c806',
  CALLBACK_URL = 'http://127.0.0.1:3000/auth/yandex/callback',
  OATH_URL = 'https://oauth.yandex.ru/authorize?response_type=code',
  TOKEN_URL = 'https://oauth.yandex.ru/token',
  PROFILE_URL = 'https://login.yandex.ru/info?format=json',
  CURATOR_LIST = 'curator_1@yandex.ru,curator_2@yandex.ru',
} = process.env;

export {
  PORT,
  JWT_SECRET,
  NODE_ENV,
  DB_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  OATH_URL,
  TOKEN_URL,
  PROFILE_URL,
  CURATOR_LIST,
};
