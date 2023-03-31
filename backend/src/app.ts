import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { requestLogger, errorLogger } from './middlwares/logger';
import { PORT, DB_URL } from './config/config';

const limiter = rateLimit({
  windowMs: 16 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
mongoose.connect(DB_URL);

app.use(limiter);
app.use(helmet());
app.use(express.json());

app.use(requestLogger);
/**
 * Далее должны быть мидлвары по обработке рутов
*/

app.use(errorLogger);
/**
 * Далее должны быть мидлвары обработки ошибок валидации
 * и централизованного обработчика ошибок
*/

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
