import mongoose, { Model, Schema } from 'mongoose';

export interface ChattingSchema {
  _id: string;
  roomId: string;
  message: string;
  createdBy: string;
  createdAt: string;
}

export const chattingSchema = new Schema<ChattingSchema, {}, {}>({
  roomId: String,
  message: String,
  createdBy: String,
  createdAt: String,
});

export const ChattingModel = mongoose.model<ChattingSchema, Model<ChattingSchema>, {}>('Chatting', chattingSchema);
