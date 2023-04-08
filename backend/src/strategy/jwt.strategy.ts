import passport from 'passport';
import { VerifiedCallback } from 'passport-jwt';
import User from '../models/User';
import { CURATOR_LIST } from '../config/config';
import { IUserPayload } from '../types/user-payload';

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

export const jwtStrategy = new JwtStrategy(opts, (async (jwt_payload: IUserPayload, done: VerifiedCallback) => {
  const { email } = jwt_payload;

  const student = await User.findOne({ email });
  const curator = CURATOR_LIST.includes(email!);

  if (student) {

    const user = {
      id: jwt_payload._id,
      role: jwt_payload.role,
      email: jwt_payload.email,
    }
    return done(null, user);
  }
  if (curator) {

    const user = {
      role: jwt_payload.role,
      email: jwt_payload.email,
    }
    return done(null, user);
  }
  return done(null, false);
}));

export const authenticate = passport.authenticate('jwt', { session: false });
