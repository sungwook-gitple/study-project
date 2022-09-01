import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';
import app from '../../app';
import { User } from '../../db/model/user';
import { checkRequired } from '../../util/validation/requestValidation';
import { createAuthenticationToken, signUp } from './auth.service';

export function routeAuth() {

  app.post('/signIn', passport.authenticate(
    'local',
    { session: false }
  ), (req, res) => {

    const { name, username } = req.body;
    const token = createAuthenticationToken(name, username);

    res.json({
      message: 'success',
      token
    });
  });

  app.post('/signUp', async (req: Request<User>, res) => {

    const validation = checkRequired(req.body, ['name', 'username', 'password']);
    if (validation.result !== 'success') {
      res.status(StatusCodes.BAD_REQUEST)
        .json({
          message: validation.message,
          data: validation.data
        });

      return;
    }
    const { name, username, password } = req.body;

    try {

      await signUp(name, username, password);
      res.json({
        message: 'success'
      });

      return;
    } catch (e) {
      console.error(e);
      res.status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({
          message: 'fail'
        });
    }
  });
}