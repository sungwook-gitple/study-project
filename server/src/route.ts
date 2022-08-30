import { routeAuth } from './auth/auth.controller';
import routeChatting from './chatting/chatting.controller';
import routeUser from './user/user.controller';

export function route() {

  routeChatting();
  routeUser();
  routeAuth();
}