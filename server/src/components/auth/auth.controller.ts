import { Request } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import app from '../../app';
import { User, UserModel } from '../../db/model/user';
import { checkRequired } from '../../util/validation/requestValidation';
import { createAuthenticationToken, signUp } from './auth.service';

export function routeAuth() {

  app.post('/signIn', async (req, res) => {

    try {

      const { name, username, password } = req.body;

      const result = await UserModel.find({
        username,
        password,
      });

      if (result.length === 0) {

        res.status(StatusCodes.UNAUTHORIZED)
          .json(({
            result: 'fail',
            message: ReasonPhrases.UNAUTHORIZED
          }));

        return;
      }
      if (result.length > 1) {

        console.error('회원 정보에 문제가 있습니다.');

        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(({
            result: 'fail',
            message: ReasonPhrases.INTERNAL_SERVER_ERROR
          }));

        return;
      }

      const user = result[0];
      const token = createAuthenticationToken(name, username);

      res.json({
        result: 'success',
        token,
        userId: user.id,
        name: user.name,
      });
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
          data: e
        });
    }
  });

  app.post('/signUp', async (req: Request<User>, res) => {

    const validation = checkRequired(req.body, ['name', 'username', 'password']);
    if (validation.result !== 'success') {
      res.status(StatusCodes.BAD_REQUEST)
        .json({
          result: 'fail',
          message: validation.message,
          data: validation.data
        });

      return;
    }
    const { name, username, password } = req.body;

    try {

      await signUp(name, username, password);
      res.json({
        result: 'success'
      });

      return;
    } catch (e) {
      console.error(e);
      if (!(e instanceof Error)) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({
            result: 'fail',
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
            data: e
          });
        return;
      }
      res.status(StatusCodes.UNAUTHORIZED)
        .json({
          result: 'fail',
          message: e.message || ReasonPhrases.INTERNAL_SERVER_ERROR
        });
    }
  });
}