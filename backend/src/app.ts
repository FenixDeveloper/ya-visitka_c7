import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { PORT, DB_URL } from './config/config';
import yandexStrategy from './auth/yandex.strategy';

passport.use(yandexStrategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user as Express.User);
});

const limiter = rateLimit({
  windowMs: 16 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
mongoose.connect(DB_URL);

app.get('/auth/yandex', passport.authenticate('yandex'));
app.get('/auth/yandex/callback',
  passport.authenticate('yandex', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  })

app.use(limiter);
app.use(helmet());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
