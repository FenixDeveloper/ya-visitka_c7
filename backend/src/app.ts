import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import 'isomorphic-fetch';
import { rateLimit } from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { errors } from 'celebrate';
import passport from 'passport';
import commentsRouter from './routes/comments';
import errorMiddleware from './middlwares/error-middleware';
import router from './routes/upload-files';
import { requestLogger, errorLogger } from './middlwares/logger';
import { PORT, DB_URL } from './config/config';
import usersRouter from './routes/user';
import { login, getUser } from './controllers/oauth';
import { jwtStrategy, authenticate } from './strategy/jwt.strategy';

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

passport.use(jwtStrategy);
app.use(passport.initialize());
app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

app.use(limiter);
app.use(helmet());
app.use(express.json());

// вместо фронтенда, для получения кода подтверждения
// app.get('/auth/yandex', (req, res) => {
//   res.redirect('https://oauth.yandex.ru/authorize?response_type=code&client_id=6588f39ea0274d599d3c60fb10c53556');
// });

// где можно получить код -> /auth/yandex/callback;

app.use(requestLogger);
// берет код подтверждения - отдает токен
app.post('/api/auth', login);
app.use(authenticate);
// берет токен - отдает user
app.get('/api/auth/get-user', getUser);

app.use(router);
app.use('/api/users', usersRouter);

/**
 * Далее должны быть мидлвары по обработке рутов
 */

app.use('/api/comments', commentsRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

async function main() {
  await mongoose.connect(DB_URL);

  // Ниже находятся захардкорженные данные для проверки работоспособности кода, в дальнейшем удалим
  // const user = new User({
  //   email: 'pupkin@mail.ru',
  //   cohort: '7',
  //   profile: {
  //     name: 'Василий Пупкин',
  //     photo: 'https://mobimg.b-cdn.net/v3/fetch/f9/f9ff433189acc56a031edd9847a2e9d7.jpeg',
  //     city: { name: 'Москва', geocode: [55.601, 37.359] },
  //     birthday: new Date(1995, 11, 25),
  //     quote: 'Я верю, что качества человека определяются его окружением, а не наследственностью',
  //     telegram: '@pupkinvas',
  //     github: 'https://github.com/pupkinvas',
  //     template: 'дерзкий',
  //   },
  //   info: {
  //     hobby: { text: 'Рисование', image: 'https://www.shkolazhizni.ru/img/content/i229/229038_or.jpg' },
  //     status: {
  //       text: 'Женат, один ребенок',
  //       image: 'https://nov-zemlya.ru/media/project_mo_171/0b/db/2c/ac/3e/2a/den-semi.jpg',
  //     },
  //     job: { text: 'Хирург', image: 'https://www.shkolazhizni.ru/img/content/i168/168346_or.jpg' },
  //     edu: { text: 'Лепить горшки', image: 'https://kukla-art.ru/userfiles/bs/goncharnaya-masterskaya-spb-24_156.jpg' },
  //   },
  // });

  // const user2 = new User({
  //   email: 'viktoriyalistvina1980@gmail.com',
  //   cohort: '8',
  //   profile: {
  //     name: 'Виктория Листвиновская',
  //     photo: 'https://cdn-st2.rtr-vesti.ru/vh/pictures/hd/233/494/1.jpg',
  //     city: { name: 'Калуга', geocode: [54.529, 36.275] },
  //     birthday: new Date(1985, 10, 14),
  //     quote: 'Делай, что должно и будь, что будет',
  //     telegram: '@listvina',
  //     github: 'https://github.com/listvina',
  //     template: 'романтичный',
  //   },
  //   info: {
  //     hobby: { text: 'Пение', image: 'https://n1s2.hsmedia.ru/db/e4/0f/dbe40fc8add61e2a37035ca9f38402b6/690x460_0x0a330c2a_12293742051580204327.jpeg' },
  //     status: {
  //       text: 'Замужем, двое детей, собака',
  //       image: 'https://gnk-shop.ru/upload/56b100e626343_family.jpg',
  //     },
  //     job: { text: 'Работаю в сфере гостиничного бизнеса', image: 'https://romani-hotel.ru/wp-content/uploads/2019/11/7380605_0x0.jpg' },
  //     edu: { text: 'IT', image: 'https://protexpharmacy.net/images/2022/03/27/20220327065628_73399.jpg' },
  //   },
  // });

  // const emotionReaction = new Emotion({
  //   from: {
  //     _id: user2._id,
  //     name: user2.profile.name,
  //     email: user2.email,
  //   },
  //   target: 'hobby',
  //   emotion: '<3',
  // });

  // const textReaction = new Text({
  //   from: {
  //     _id: user2._id,
  //     name: user2.profile.name,
  //     email: user2.email,
  //   },
  //   target: 'job',
  //   text: 'Очень ответственная работа у тебя',
  // });

  // const textReaction2 = new Text({
  //   from: {
  //     _id: user._id,
  //     name: user.profile.name,
  //     email: user.profile.name,
  //   },
  //   target: 'edu',
  //   text: 'Молодец. В современно мире без технологий никуда',
  // });

  // user.reactions.push(emotionReaction, textReaction);
  // user2.reactions.push(textReaction2);
  // await user.save();
  // await user2.save();
}

main().catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
