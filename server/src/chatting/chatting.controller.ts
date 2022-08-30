import app from '../app';

import restful from 'node-restful';
import { chattingSchema } from '../db/model/chatting';

export default function routeChatting() {

  restful.model('chatting', chattingSchema)
    .methods(['get', 'post', 'put', 'delete'])
    .register(app, 'chatting');
}
