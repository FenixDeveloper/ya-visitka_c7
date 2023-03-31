
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { PORT, DB_URL } from './config/config';
import User from "./models/User";
import { Reaction, EmotionReaction } from "./models/Reaction";
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

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DB_URL);

  const user = new User({
    name: "Тест2",
    email: "test@test.ru",
    cohort: "web +16",
    profile: {
      name: "Тест",
      photo: "http://some-photo.ru",
      city: { name: "Тестоград", geocode: [134.854, -25.828] },
      birthday: new Date(2022, 11, 25),
      quote: "Цитата",
      telegram: "@telega",
      github: "githubber",
      template: "Тема оформления",
    },
    info: {
      hobby: { text: "Крутое хобби", image: "http://some-hobby-photo.ru" },
      status: { text: "Семейный статус", image: null },
      job: { text: "Работа", image: null },
      edu: { text: "Обучение", image: null },
    },
  });

  const reaction = new Reaction({
    from: {
      _id: user._id,
      name: user.profile?.name,
      email: user.email,
    },
    target: user.info?.hobby?.text,
    text: "Комментарий",
  });

  const emoteReaction = new EmotionReaction({
    from: {
      _id: user._id,
      name: user.profile?.name,
      email: user.email,
    },
    target: user.info?.hobby?.text,
    emotion: "emote",
  });

  // await reaction.save();
  // await emoteReaction.save();

  user.reactions.push(reaction, emoteReaction);
  // await user.save();
  console.log(user);
}
