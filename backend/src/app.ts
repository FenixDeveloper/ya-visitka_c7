import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { PORT, DB_URL } from './config/config';
import User from "./models/User";
import { Reaction, EmotionReaction } from "./models/Reaction";
//import yandexStrategy from './auth/yandex.strategy';
import session from 'express-session';
const jwt = require('jsonwebtoken')
const yandexStrategy = require('passport-yandex').Strategy;
const yandex = {
  CLIENT_ID: "6588f39ea0274d599d3c60fb10c53556",
  CLIENT_SECRET: "0b81a854811c449fa333c98c0e44c806",
  CALLBACK_URL : "http://127.0.0.1:3000/auth/yandex/callback"
}
const curatorList = ['curator_1@yandex.ru', 'curator_2@yandex.ru']

const app = express();
let userProfile: any;
passport.use(new yandexStrategy({
  clientID: yandex.CLIENT_ID,
  clientSecret: yandex.CLIENT_SECRET,
  callbackURL: yandex.CALLBACK_URL
}, async (accessToken: any, refreshToken: any, profile: any, done: any) => {

  const email = profile._json.default_email;
  const name = profile._json.first_name;
  const student = await User.findOne({ email });
   if(student) {
    const studentToken = jwt.sign(
      {_id: student._id,
        name: name,
        email: email,
        cohort: student.cohort,
        photo: student.profile?.photo,
        role: 'student'},
        'secret',
        {
          expiresIn: '10h'
        }
    )
    userProfile = studentToken;
    return done(null, studentToken)
   }
   const isCurator = curatorList.includes(email);
   if(isCurator){
      const curatorTokin = jwt.sign({ _id: null, role: 'curator'},
      'secret',
      {
        expiresIn: '10h'
      }
      )
      userProfile = curatorTokin;
    return done(null, curatorTokin)
   }

}));


app.use(session({
  secret: 'session_secret',
}));

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

mongoose.connect(DB_URL);

app.get('/auth/yandex', passport.authenticate('yandex'));
app.get('/auth/yandex/callback',
  passport.authenticate('yandex', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/',(req, res) => {
  const decoded = jwt.decode(userProfile)
  res.send(decoded);
})

app.use(limiter);
app.use(helmet());
app.use(express.json());



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect(DB_URL);

//   const user = new User({
//     name: "Тест2",
//     email: "karkachevich@yandex.ru",
//     cohort: "web +16",
//     profile: {
//       name: "Тест",
//       photo: "http://some-photo.ru",
//       city: { name: "Тестоград", geocode: [134.854, -25.828] },
//       birthday: new Date(2022, 11, 25),
//       quote: "Цитата",
//       telegram: "@telega",
//       github: "githubber",
//       template: "Тема оформления",
//     },
//     info: {
//       hobby: { text: "Крутое хобби", image: "http://some-hobby-photo.ru" },
//       status: { text: "Семейный статус", image: null },
//       job: { text: "Работа", image: null },
//       edu: { text: "Обучение", image: null },
//     },
//   });

//   const reaction = new Reaction({
//     from: {
//       _id: user._id,
//       name: user.profile?.name,
//       email: user.email,
//     },
//     target: user.info?.hobby?.text,
//     text: "Комментарий",
//   });

//   const emoteReaction = new EmotionReaction({
//     from: {
//       _id: user._id,
//       name: user.profile?.name,
//       email: user.email,
//     },
//     target: user.info?.hobby?.text,
//     emotion: "emote",
//   });

//   // await reaction.save();
//   // await emoteReaction.save();
//   //User.create(user)
//   user.reactions.push(reaction, emoteReaction);
//   // await user.save();
//   //console.log(user);
// }
