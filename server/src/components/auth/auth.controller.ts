import { Request } from 'express';
import * as core from 'express-serve-static-core';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { User, UserModel } from '@/src/db/model/user';
import { checkRequired } from '../../util/validation/requestValidation';
import { signUp } from './auth.service';
import { AuthenticateService } from '@/src/models/auth/authenticateService';

export function routeAuth(app: core.Express, { authenticateService }: {
  authenticateService: AuthenticateService
}) {

  app.post('/signIn', async (req, res) => {

    try {

      const { name, username, password } = req.body;

      const result = await authenticateService.authenticate(username, password);

      if ('error' in result) {
        console.warn('회원 정보에 문제가 있습니다.');
        res.status(StatusCodes.UNAUTHORIZED)
          .json(({
            message: ReasonPhrases.UNAUTHORIZED
          }));
        return;
      }

      const { user, token } = result;
      res.cookie('token', token)

      res.json({
        message: 'success',
        token,
        username: user.username,
        name: user.name,
      });
    } catch (e) {
      console.error(`/signIn params:`, req.body, e);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
          data: e
        });
    }
  });

  app.delete('/signOut', async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.token) {
      res.status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({
          message: 'does not exist login information'
        });

      return;
    }

    res.clearCookie('token')
    res.json({
      message: 'success'
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

  app.get('/authCheck', async (req, res) => {
    if (!req.cookies?.token) {
      res.json({
        message: 'fail'
      });
      return;
    }

    res.json({
      message: 'success'
    })
  })
}
