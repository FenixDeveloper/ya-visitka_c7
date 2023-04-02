import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import router from './routes/upload-files';
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

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
