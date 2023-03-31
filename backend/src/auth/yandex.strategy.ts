import User from "../models/User";

const passport = require('passport-yandex');

const yandex = {
  CLIENT_ID: "6588f39ea0274d599d3c60fb10c53556",
  CLIENT_SECRET: "0b81a854811c449fa333c98c0e44c806",
  CALLBACK_URL : "http://127.0.0.1:3000/auth/yandex/callback"
}


const yandexStrategy = new passport.Strategy({
  clientID: yandex.CLIENT_ID,
  clientSecret: yandex.CLIENT_SECRET,
  callbackURL: yandex.CALLBACK_URL
}, function (accessToken: any, refreshToken: any, profile: any, done: any) {
  const email = profile._json.default_email;
  User.findOne({ email }).then(user => {
    console.log(user)

  });

});

export default yandexStrategy;



