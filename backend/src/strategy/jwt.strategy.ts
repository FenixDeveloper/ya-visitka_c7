import passport from 'passport';
import User from '../models/User';

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const curatorList = ['curator_1@yandex.ru', 'curator_2@yandex.ru'];

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

export const jwtStrategy = new JwtStrategy(opts, ((jwt_payload: any, done: any) => {
  const { email } = jwt_payload;

  const student = User.findOne({ email });
  const curator = curatorList.includes(email);

  if (student) {
    return done(null, student);
  }
  if (curator) {
    return done(null, jwt_payload);
  }
  return done(null, false);
}));

export const authenticate = passport.authenticate('jwt', { session: false });
