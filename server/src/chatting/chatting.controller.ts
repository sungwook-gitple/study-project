import app from '../app';

import { chattingSchema } from '@/db/model/chatting';
import restful from 'node-restful';

export default function routeChatting() {

  restful.model('chatting', chattingSchema)
    .methods(['get', 'post', 'put', 'delete'])
    .register(app, 'chatting');
}
