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

app.use('/comments', commentsRouter);

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

async function main() {
  await mongoose.connect(DB_URL);
}

main().catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
