import { routeAuth } from './components/auth/auth.controller';
import { routeChatting } from './components/chatting/chatting.controller';
import { routeUser } from './user/user.controller';

export function route() {

  routeChatting();
  routeUser();
  routeAuth();
}