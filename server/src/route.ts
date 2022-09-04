import { routeAuth } from './components/auth/auth.controller';
import { routeChatting } from './components/chatting/chatting.controller';
import roomRouter from './components/chatting/room.controller';
import { routeUser } from './user/user.controller';

export function registerRouter() {

  routeChatting();
  routeUser();
  routeAuth();
  roomRouter.register();
}