import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import passport from 'passport';

export function authorize (role?: string, findByIdAndCreatedBy?: (id: string, createdBy: string) => any) {

  if (role === 'public') {
    return (_req: Request, _res: Response, next: NextFunction) => {
      next();
    };
  }

  return async (req: Request, res: Response, next: NextFunction) => {

    const result = await new Promise((resolve, reject) => {

      passport.authenticate(
        'jwt',
        { session: false },
        (err, user) => {

          if (err || !user) {
            reject(err || new Error('로그인이 안되었습니다.'));
          }

          req.user = user;
          resolve('success');
        }
      )(req, res);
    }).catch(e => {
      console.error('authentication error', e);
      return false;
    });

    if (!result) {
      res.status(StatusCodes.UNAUTHORIZED)
        .json({
          message: ReasonPhrases.UNAUTHORIZED
        });
      return;
    }

    if (role === 'own' && findByIdAndCreatedBy) {
      console.log('=== req.params.id', req.params.id);
      const user = req.user as { id: string };

      const result = await findByIdAndCreatedBy(req.params.id, user.id);
      console.log('=== result', result);
      if (result.length === 0) {
        res.status(StatusCodes.UNAUTHORIZED)
          .json({
            result: 'fail',
            message: ReasonPhrases.UNAUTHORIZED
          });
        return;
      }
    }

    next();
  };
}