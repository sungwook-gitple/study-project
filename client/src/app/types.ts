import { ServerResponse } from 'src/http/types';
import { SignUpRequest } from './user/sign-up/type';

export interface ISignUp {
  signUp(user: SignUpRequest): Promise<ServerResponse>;
  gotoSignIn(): void;
}

export interface GlobalState {
  currentRoomId?: string;
  isUnauthorized?: boolean;
}
