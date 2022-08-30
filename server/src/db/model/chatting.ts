import { Schema } from 'mongoose';

export interface Chatting {
  content: string;
  createdBy: string;
  createdAt: string;
}

export const chattingSchema = new Schema({
  content: String,
  createdBy: String,
  createdAt: String,
});
