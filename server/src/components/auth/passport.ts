import { Request, Response } from 'express';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { User, UserModel } from '../db/model/user';

export function configPassport() {

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    issuer: 'accounts.examplesoft.com',
    audience: 'yoursite.net',
  };

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
      UserModel.findOne({ username, password })
        .then((existedUser: User | null) => {
          if (!existedUser) {
            done(null, false);
          }
          done(null, existedUser);
        }).catch((e: Error) => {
          console.error(e);
          done(null, false);
        });

      return;
    }
  ));
}

export function signIn<T> (req: Request<T>, res: Response) {

  return passport.authenticate('local', { session: false }, (err, user) => {

    if (err) {
      throw new Error('Unathorized');
    }
    if (!user) {
      throw new Error('not founded');
    }

    return 'success';
  });
}
