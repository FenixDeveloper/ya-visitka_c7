import User from "../models/User";

const jwt = require('jsonwebtoken')
const passport = require('passport-yandex');

const yandex = {
  CLIENT_ID: "6588f39ea0274d599d3c60fb10c53556",
  CLIENT_SECRET: "0b81a854811c449fa333c98c0e44c806",
  CALLBACK_URL : "http://127.0.0.1:3000/auth/yandex/callback"
}

const curatorList = ['curator_1@yandex.ru', 'curator_2@yandex.ru']

const yandexStrategy = new passport.Strategy({
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
    return done(null, curatorTokin)
   }

});

export default yandexStrategy;



