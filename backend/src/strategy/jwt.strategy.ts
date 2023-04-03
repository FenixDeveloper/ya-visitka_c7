import User from '../models/User';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret',
}

export const jwtStrategy = new JwtStrategy(opts, function(jwt_payload: any, done: any) {
  console.log('payload received', jwt_payload);

    User.findOne(jwt_payload.sud, function(err: any, user: any) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
          // or you could create a new account
      }
    });

});


