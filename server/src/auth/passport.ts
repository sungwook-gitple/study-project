import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../db/model/user';

export function configPassport() {

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    issuer: 'accounts.examplesoft.com',
    audience: 'yoursite.net',
  };

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  passport.use(new JwtStrategy(
    opts,
    function(jwtPayload, done) {
      console.log('== jwtPayload.sub', jwtPayload.sub);
      UserModel.findOne({name: jwtPayload.sub}, function(err: any, user: any) {
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
  }));

  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log('=== local', username, password);
      const existedUser = UserModel.findOne({ username, password });

      if (!existedUser) {
        done(null, false);
      }

      done(null, existedUser);

      return;
    }
  ));

  console.log('=== passport configured');
}
