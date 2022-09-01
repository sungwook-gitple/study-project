import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import passport from 'passport';

export function authorize (role?: string) {

  if (role === 'public') {
    return (_req: Request, _res: Response, next: NextFunction) => {
      next();
    };
  }
  return (req: Request, res: Response, next: NextFunction) => {

    return passport.authenticate(
      'jwt',
      { session: false },
      (err, user) => {

        if (err || !user) {
          res.status(StatusCodes.UNAUTHORIZED)
            .json({
              message: ReasonPhrases.UNAUTHORIZED
            });
          return;
        }

        next();
      }
    )(req, res);
  };

}