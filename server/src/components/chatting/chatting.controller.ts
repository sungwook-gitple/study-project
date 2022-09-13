import app from '@/src/app';
import { chattingMqtt } from '@/src/components/chatting';
import { ChattingModel, chattingSchema } from '@/src/db/model/chatting';
import { authorize } from '@/src/middleware/authorization';
import { validateRequired } from '@/src/util/validation/requestValidation';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import restful from 'node-restful';
import { CHATTING_TOPIC } from './constants';
import { Chatting } from './types';

export function routeChatting() {

  const Chatting = restful.model('chatting', chattingSchema)
    .methods(['get', 'post', 'put', 'delete']);

  Chatting.before('', authorize());
  Chatting.register(app, '/chatting');

  app.get('/chatting/unsubscribe', (req, res) => {

    chattingMqtt.client?.unsubscribe('hello', () => {
      console.log('hello unsubscribed');
    });

    res.json({
      message: 'success'
    });
  });

  app.get('/rooms/:id/chatting', async (req, res) => {

    const roomId = req.params.id;

    const chats = await ChattingModel.find({ roomId });

    res.json({
      result: 'success',
      data: chats
    });
  });


  app.post('/chatting', authorize(), (req, res) => {

    const validation = validateRequired<Chatting>(req.body, ['createdAt', 'createdBy', 'message', 'roomId']);
    if (validation.result !== 'success') {
      res.status(StatusCodes.BAD_REQUEST)
        .json({
        message: ReasonPhrases.BAD_REQUEST,
        data: validation.missed
      });
      return;
    }

    const { roomId, message, createdBy, createdAt } = validation.data;
    chattingMqtt.publish<Chatting>(CHATTING_TOPIC, {
      roomId,
      message,
      createdBy,
      createdAt,
    });

    res.json({
      result: 'success'
    });
  });
}
