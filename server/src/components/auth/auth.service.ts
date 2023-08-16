import { config } from '@/src/config';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../db/model/user';

export async function signUp(name: string, username: string, password: string) {

  const existedUser = await UserModel.findOne({ username });

  if (existedUser) {
    throw new Error('already existed');
  }

  const newUser = new UserModel({
    name,
    username,
    password
  });

  const user = await newUser.save();

  return user.toJSON();
}

export function createAuthenticationToken({ name, username }: { name: string, username: string }) {

  return jwt.sign(
    { name, username },
    config.server.JWT_SECRET,
  );
}
