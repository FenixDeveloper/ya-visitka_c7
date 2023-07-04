import passport from 'passport';
import { VerifiedCallback, ExtractJwt, Strategy } from 'passport-jwt';
import User from '../models/User';
import { CURATOR_LIST, JWT_SECRET, NODE_ENV } from '../config/config';
import { IUserPayload } from '../types/user-payload';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: NODE_ENV === 'production' ? JWT_SECRET : 'secret',
};

export const jwtStrategy = new Strategy(
  opts,
  (async (jwtPayload: IUserPayload, done: VerifiedCallback) => {
    const email = jwtPayload.email.toLowerCase();

    const student = await User.findOne({ email });
    const curator = CURATOR_LIST.toLowerCase().split(',').includes(email);

    if (student) {
      const user = {
        id: jwtPayload._id,
        role: jwtPayload.role,
        email,
      };
      return done(null, user);
    }
    if (curator) {
      const user = {
        role: jwtPayload.role,
        email,
      };
      return done(null, user);
    }
    return done(null, false);
  }),
);

export const authenticate = passport.authenticate('jwt', { session: false });
