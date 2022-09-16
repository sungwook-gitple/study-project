import jwt from 'jsonwebtoken';

export function getUserByToken(token: string) {
  const user = jwt.decode(token);

  if (user && typeof user !== 'string') {
    return user;
  }

  return {};
}