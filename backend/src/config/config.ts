import { config } from 'dotenv';
import { join } from 'path';

config({
  path: join(__dirname, '../../', '.env'),
});

const {
  PORT = 4000,
  JWT_SECRET = 'super-secret-word',
  DB_URL = 'mongodb://127.0.0.1:27017/visitka',
  CLIENT_ID = '6588f39ea0274d599d3c60fb10c53556',
  CLIENT_SECRET = '0b81a854811c449fa333c98c0e44c806',
  CURATOR_LIST = 'curator_1@yandex.ru,curator_2@yandex.ru',
} = process.env;

export {
  PORT,
  JWT_SECRET,
  DB_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  CURATOR_LIST,
};
