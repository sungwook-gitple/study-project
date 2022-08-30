import passport from 'passport';
import { UserModel } from '../db/model/user';

export async function signup(name: string, username: string, password: string) {

  const existedUser = await UserModel.find({ username }).exec();
  if (existedUser) {
    console.log('=== existedUser', existedUser);
    throw new Error('already existed');
  }

  const newUser = new UserModel({
    name,
    username,
    password
  });

  const a = await newUser.save();
  console.log('=== a', a);
}

export async function signin(username: string, password: string) {

  passport.authenticate('local', { session: false }, (err, user) => {
    console.log('== authenticate');
    if (err) {
      throw new Error('Unathorized');
    }
    if (!user) {
      throw new Error('not founded');
    }

    return 'success';
  });

  // return new Promise((resolve, reject) => {
  //   console.log('=== sign service');
  //   passport.authenticate('local', { session: false }, (err, user) => {
  //     console.log('== authenticate');
  //     if (err) {
  //       reject(err);
  //     }
  //     if (!user) {
  //       reject(new Error('not founded'));
  //     }

  //     resolve('success');
  //   });
  // });
}
