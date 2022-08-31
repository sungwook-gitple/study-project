import { UserModel } from '../db/model/user';

export async function signUp(name: string, username: string, password: string) {

  const existedUser = await UserModel.find({ username });

  if (existedUser) {
    throw new Error('already existed');
  }

  const newUser = new UserModel({
    name,
    username,
    password
  });

  const a = await newUser.save();
}
