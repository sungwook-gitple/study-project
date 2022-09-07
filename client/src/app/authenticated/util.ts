import { updateHttpAuthorization } from 'src/http/configOption';
import { LOCAL_STORAGE_AUTH_TOKEN_KEY } from './constants';

export function getAuthorizationToken() {
  return localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY)
}

export async function setAuthorizationToken(token: string) {
  localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, token)
  await updateHttpAuthorization(token)
}
