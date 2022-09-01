import { config } from '@/src/config';
import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../../db/model/user';

export function configPassport() {

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.server.JWT_SECRET,
    // issuer: 'accounts.examplesoft.com',
    // audience: 'yoursite.net',
  };

  passport.use(new JwtStrategy(
    opts,
    async (payload, done) => {

      const { name, username } = payload;

      const user = await UserModel.findOne({ username })
        .catch(e => {
          console.error(e);
        });

      if (!user) {
        done(null, false);
        return;
      }

      done(null, user);
    }
  ));

  passport.use(new LocalStrategy(
    async (username, password, done) => {

      const user = await UserModel.findOne({ username, password })
        .catch(e => {
          console.error(e);
        });

      if (!user) {
        done(null, false);
        return;
      }

      done(null, user);
    }
  ));
}
