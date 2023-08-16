import { routeAuth } from './components/auth/auth.controller';
import * as core from 'express-serve-static-core';
import { authenticateService } from '@/src/models/auth';

import { routeChatting } from './components/chatting/chatting.controller';
import roomRouter from './components/chatting/room.controller';
import { routeUser } from './user/user.controller';

export function registerRouter(app: core.Express) {

  routeChatting();
  routeUser();
  routeAuth(app, {
    authenticateService
  });
  roomRouter.register();
}