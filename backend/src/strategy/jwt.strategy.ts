import passport from 'passport';
import User from '../models/User';
import { CURATOR_LIST } from '../config/config';

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

export const jwtStrategy = new JwtStrategy(opts, ((jwt_payload: any, done: any) => {
  const { email } = jwt_payload;

  const student = User.findOne({ email });
  const curator = CURATOR_LIST.includes(email);

  if (student) {
    return done(null, student);
  }
  if (curator) {
    return done(null, jwt_payload);
  }
  return done(null, false);
}));

export const authenticate = passport.authenticate('jwt', { session: false });
