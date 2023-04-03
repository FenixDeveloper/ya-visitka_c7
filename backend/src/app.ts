import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import router from './routes/upload-files';
import { requestLogger, errorLogger } from './middlwares/logger';

import { PORT, DB_URL } from './config/config';
// Ниже импорты для использования в захардкорженных данных (стр.45)
// import User from './models/User';
// import { Text, Emotion } from './models/Reaction';

const limiter = rateLimit({
  windowMs: 16 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

app.use(limiter);
app.use(helmet());
app.use(express.json());

app.use(requestLogger);

app.use(router);
/**
 * Далее должны быть мидлвары по обработке рутов
*/

app.use(errorLogger);
/**
 * Далее должны быть мидлвары обработки ошибок валидации
 * и централизованного обработчика ошибок
*/

async function main() {
  await mongoose.connect(DB_URL);

  // Ниже находятся захардкорженные данные для проверки работоспособности кода, в дальнейшем удалим
  // const user = new User({
  //   email: 'test@test.ru',
  //   cohort: 'web +16',
  //   profile: {
  //     name: 'Тест',
  //     photo: 'https://www.test.com/photo.png',
  //     city: { name: 'Тестоград', geocode: [134.854, -25.828] },
  //     birthday: new Date(2022, 11, 25),
  //     quote: 'Цитата',
  //     telegram: '@telega',
  //     github: 'githubber',
  //     template: 'Тема оформления',
  //   },
  //   info: {
  //     hobby: { text: 'Крутое хобби', image: 'https://www.test.com/photo.png' },
  //     status: {
  //       text: 'Семейный статус',
  //       image: 'https://www.test.com/photo.png',
  //     },
  //     job: { text: 'Работа', image: 'https://www.test.com/photo.png' },
  //     edu: { text: 'Обучение', image: 'https://www.test.com/photo.png' },
  //   },
  // });

  // const user2 = new User({
  //   email: 'test2@test.ru',
  //   cohort: 'web +16',
  //   profile: {
  //     name: 'Тест2',
  //     photo: 'https://www.test.com/photo.png',
  //     city: { name: 'Тестоград', geocode: [134.854, -25.828] },
  //     birthday: new Date(2022, 11, 25),
  //     quote: 'Цитата',
  //     telegram: '@telega',
  //     github: 'githubber',
  //     template: 'Тема оформления',
  //   },
  //   info: {
  //     hobby: { text: 'Крутое хобби', image: 'https://www.test.com/photo.png' },
  //     status: {
  //       text: 'Семейный статус',
  //       image: 'https://www.test.com/photo.png',
  //     },
  //     job: { text: 'Работа', image: 'https://www.test.com/photo.png' },
  //     edu: { text: 'Обучение', image: 'https://www.test.com/photo.png' },
  //   },
  // });

  // const emotionReaction = new Emotion({
  //   from: {
  //     _id: user2._id,
  //     name: user2.profile.name,
  //     email: user2.profile.name,
  //   },
  //   target: 'hobby',
  //   emotion: 'emote',
  // });

  // const textReaction = new Text({
  //   from: {
  //     _id: user2._id,
  //     name: user2.profile.name,
  //     email: user2.profile.name,
  //   },
  //   target: 'hobby',
  //   text: 'Комментарий',
  // });

  // user.reactions.push(emotionReaction, textReaction);

  // await user.save();
  // await user2.save();
}

main().catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
