import mongoose, { Schema } from 'mongoose';

export interface User {
  name: string;
  username: string;
  password: string;
}
export const userSchema = new Schema<User>({
  name: String,
  username: String,
  password: String
});

export const UserModel = mongoose.model('user', userSchema);
