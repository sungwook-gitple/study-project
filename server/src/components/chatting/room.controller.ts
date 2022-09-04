import app from '@/src/app';
import { roomSchema } from '@/src/db/model/room';
import { authorize } from '@/src/middleware/authorization';
import { validateRequest } from '@/src/middleware/validation';
import { isPassportUser } from '@/src/util/validation/passportUser';
import { Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import restful from 'node-restful';
import { roomService } from '.';

export default {
  register() {

    const roomApp = restful.model('Room', roomSchema)
      .methods(['get', 'post', 'put', 'delete']);

    roomApp.before('', authorize())
      .before('post', validateRequest({
        title: { type: 'string' },
        createdBy: { type: 'string' }
      }))
      .before('put', validateRequest({
        id: { type: 'string' },
      }))
      .before('delete', validateRequest({
        id: { type: 'string' },
        updatedBy: { type: 'string' }
      }));

    roomApp.route('enter.put', {
      detail: true,
      handler: async (req: Request, res: Response) => {

        const { id } = req.params;
        const { user } = req;

        if (!isPassportUser(user)) {
          res.status(StatusCodes.UNAUTHORIZED)
            .json({
            message: ReasonPhrases.UNAUTHORIZED
          });

          return;
        }

        const member = {
          userId: user.id,
          name: user.name
        };

        try {
          const result = await roomService.enter(id, member);

          if (result.result !== 'success') {
            res.json({
              result: 'fail',
              message: result.message,
              data: result.data
            });

            return;
          }

          res.json({
            result: 'success',
            message: result.message,
            data: result.data,
          });
        } catch (e) {
          console.error('=== error', e);
          if (!(e instanceof Error)) {
            res.json(e);
            return;
          }

          res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
              message: ReasonPhrases.INTERNAL_SERVER_ERROR,
              data: {
                message: e.message
              }
            });
        }
      }
    } as any);

    roomApp.before('enter', authorize());

    roomApp.route('leave.put',  {
      detail: true,
      handler: async (req: Request, res: Response) => {

        const { id } = req.params;
        const { user } = req;

        if (!isPassportUser(user)) {
          res.status(StatusCodes.UNAUTHORIZED)
            .json({
            message: ReasonPhrases.UNAUTHORIZED
          });

          return;
        }

        try {
          const result = await roomService.leave(id, user.id);

          if (result.result !== 'success') {
            res.json({
              result: 'fail',
              message: result.message,
              data: result.data
            });

            return;
          }

          res.json({
            result: 'success',
            message: 'leave test'
          });
        } catch (e) {
          console.error(e);
          if (!(e instanceof Error)) {
            res.json(e);
            return;
          }
          res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
              result: 'fail',
              message: e.message,
              data: e
            });
        }
      }
    } as any);

    roomApp.before('leave', authorize());

    roomApp.register(app, '/rooms');
  }
};
