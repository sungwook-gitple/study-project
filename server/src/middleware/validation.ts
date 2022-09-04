import { RequestHandler } from 'express';
import Validator, { ValidationSchema } from 'fastest-validator';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const validator = new Validator();

export function validateRequest(schema: ValidationSchema): RequestHandler {

  const check = validator.compile(schema);

  return (req, res, next) => {
    const data = {
      ...req.query,
      ...req.params,
      ...req.body
    };

    const checked = check(data);

    if (checked !== true) {
      res.status(StatusCodes.BAD_REQUEST)
        .json({
          message: ReasonPhrases.BAD_REQUEST,
          data: checked
        });
      return;
    }

    next();
  };
}