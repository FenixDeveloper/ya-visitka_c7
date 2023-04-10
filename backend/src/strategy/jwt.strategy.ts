import passport from 'passport';
import { VerifiedCallback, ExtractJwt, Strategy } from 'passport-jwt';
import User from '../models/User';
import { CURATOR_LIST } from '../config/config';
import { IUserPayload } from '../types/user-payload';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
};

export const jwtStrategy = new Strategy(
  opts,
  (async (jwtPayload: IUserPayload, done: VerifiedCallback) => {
    const { email } = jwtPayload;

    const student = await User.findOne({ email });
    const curator = CURATOR_LIST.includes(email!);

    if (student) {
      const user = {
        id: jwtPayload._id,
        role: jwtPayload.role,
        email: jwtPayload.email,
      };
      return done(null, user);
    }
    if (curator) {
      const user = {
        role: jwtPayload.role,
        email: jwtPayload.email,
      };
      return done(null, user);
    }
    return done(null, false);
  }),
);

export const authenticate = passport.authenticate('jwt', { session: false });
