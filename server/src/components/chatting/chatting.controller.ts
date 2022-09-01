import app from '@/src/app';
import { chattingSchema } from '@/src/db/model/chatting';
import { authorize } from '@/src/middleware/authorization';
import { chattingMqtt } from '@/src/mqtt';
import restful from 'node-restful';

export function routeChatting() {

  const Chatting = restful.model('chatting', chattingSchema)
    .methods(['get', 'post', 'put', 'delete']);

  Chatting.before('', authorize());
  Chatting.register(app, '/chatting');

  app.get('/chatting/unsubscribe', (req, res) => {
    console.log('=== unsub');
    chattingMqtt.client?.unsubscribe('hello', () => {
      console.log('hello unsubscribed');
    });

    res.json({
      message: 'success'
    });
  });
}
