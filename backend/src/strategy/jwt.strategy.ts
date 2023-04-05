import User from '../models/User';
import passport from 'passport';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const curatorList = ['curator_1@yandex.ru', 'curator_2@yandex.ru'];

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
}


export const jwtStrategy = new JwtStrategy(opts, function(jwt_payload: any, done: any) {
 const email = jwt_payload.email;

 const student = User.findOne({email});
 const curator = curatorList.includes(email);

 if (student) {
    return done(null, student);
  }
 if (curator) {
     return done(null, jwt_payload);
    } else {
            return done(null, false);
      }

});

export const authenticate = passport.authenticate('jwt', {session: false});


