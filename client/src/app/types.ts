import { ServerResponse } from 'http';
import { User } from './authenticated/types';

export interface ISignUp {
  signUp(user: User): Promise<ServerResponse>;
  gotoSignIn(): void;
}

export interface GlobalState {
  currentRoomId?: string;
  isUnauthorized?: boolean;
}
