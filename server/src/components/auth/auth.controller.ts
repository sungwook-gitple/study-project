import { checkRequired } from '@/util/validation/requestValidation';
import { Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';
import app from '../../app';
import { User } from '../../db/model/user';
import { signUp } from './auth.service';

export function routeAuth() {

  app.post('/signIn', passport.authenticate(
    'local',
    { session: false }
  ))

  app.post('/signUp', async (req: Request<User>, res) => {

    const validation = checkRequired(req.params, ['name', 'username', 'password'])
    if (validation.result !== 'success') {
      res.status(StatusCodes.BAD_REQUEST)
        .json({
          message: validation.message,
          data: validation.data
        })
    }
    const { name, username, password } = req.params

    if (['name']) 

    try {

      await signUp(name, username, password)
      res.json({
        message: 'success'
      })
    } catch(e) {
      console.error(e);
      res.status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({
          message: 'fail'
        })
    }
  })
}