import { LOCAL_STORAGE_AUTH_TOKEN_KEY, USER_ID_KEY, USER_NAME_KEY } from './constants';
import { User } from './types';

export function getAuthorizationToken() {
  return localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
}

export async function setAuthorizationToken(token: string) {
  localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, token);
}

export async function setAuthorizationData({
  token,
  userId,
  name,
}: {
  token: string;
  userId: string;
  name: string;
}) {
  setAuthorizationToken(token);
  localStorage.setItem(USER_ID_KEY, userId);
  localStorage.setItem(USER_NAME_KEY, name);
  // await updateHttpAuthorization(token)
}

export function getUserId() {
  return localStorage.getItem(USER_ID_KEY);
}

export function getUserName() {
  return localStorage.getItem(USER_ID_KEY);
}

export function getUser(): User {
  return {
    id: getUserId(),
    name: getUserName(),
  };
}

export function hasBeenAuthorized() {
  return getAuthorizationToken()
    && getUserId()
    && getUserName();
}
