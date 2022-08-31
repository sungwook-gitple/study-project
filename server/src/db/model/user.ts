import * as mongoose from 'mongoose';

import { Schema } from 'mongoose';

export interface User {
  name: string;
  username: string;
  password: string;
}
export const userSchema = new Schema<User>({
  name: String,
  username: String,
  password: String
}, {
  timestamps: true
});

export const UserModel = mongoose.model<User>('User', userSchema);
